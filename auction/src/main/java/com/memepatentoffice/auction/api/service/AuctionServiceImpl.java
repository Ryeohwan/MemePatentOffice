package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.message.WebSocketChatRes;
import com.memepatentoffice.auction.api.response.AuctionRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.common.util.ExceptionSupplier;
import com.memepatentoffice.auction.common.util.InterServiceCommunicationProvider;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.entity.type.AuctionStatus;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.util.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class AuctionServiceImpl implements AuctionService{
    private final String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
    private final Integer AUCTION_DURATION_MINUTES = 60*24;

    private final AuctionRepository auctionRepository;
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final InterServiceCommunicationProvider isp;

    public AuctionServiceImpl(AuctionRepository auctionRepository,
                              SimpMessageSendingOperations simpMessageSendingOperations,
                              InterServiceCommunicationProvider interServiceCommunicationProvider) {
        this.auctionRepository = auctionRepository;
        this.simpMessageSendingOperations = simpMessageSendingOperations;
        this.isp = interServiceCommunicationProvider;
    }

    @Transactional
    @Override
    public Long enrollAuction(AuctionCreationReq req) throws NotFoundException, IOException {
        //TODO: 밈 번호 유효성 검사, 판매자 유효성 검사
        if(!isp.existsMemeById(req.getMemeId())) throw new NotFoundException()
        log.info(req.toString());
        Long auctionId = auctionRepository.save(Auction.builder()
                        .memeId(req.getMemeId())
                        .startTime(req.getStartDateTime())
                        .sellerId(req.getSellerId())
                        .status(AuctionStatus.ENROLLED)
                .build()).getId();

        ZonedDateTime startZdt = req.getStartDateTime().atZone(ZoneId.systemDefault());
        Date startDate = Date.from(startZdt.toInstant());
        ZonedDateTime terminateZdt = req.getStartDateTime().plusMinutes(AUCTION_DURATION_MINUTES)
                .atZone(ZoneId.systemDefault());
        Date terminateDate = Date.from(terminateZdt.toInstant());

        new Timer().schedule(
                new AuctionStarter(auctionId),
                //java.util.Date타입
                startDate
        );
        new Timer().schedule(
                new AuctionTerminater(auctionId),
                terminateDate
        );
        return auctionId;
    }


    @Override
    public void sendChat(WebSocketChatReq req){
        //옥션 id, 유저 id존재하는지 확인
        Long auctionId = req.getAuctionId();
        WebSocketChatRes res = WebSocketChatRes.builder()
                .auctionId(auctionId)
                .nickname(req.getNickname())
                .message(req.getMessage())
                .createdAt(LocalDateTime.now()).build();
        simpMessageSendingOperations.convertAndSend("/sub/chat/"+auctionId, res);

    }

    @Override
    public List<AuctionRes> findAllByHit(){
        return auctionRepository.findAllProceeding().stream()
                .map(auction -> streamExceptionHandler(()->{
                    String respBody = isp.findMemeById(auction.getMemeId());
                    if(respBody==null) throw new NotFoundException("유효하지 않은 밈 아이디입니다");

                    JSONObject jsonObject = new JSONObject(respBody);
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    respBody = isp.getResponsefromOtherServer(MPOFFICE_SERVER_URL+"/api/mpoffice/user/info/"+auction.getSellerId());
                    if(respBody==null) throw new NotFoundException("유효하지 않은 유저 id입니다");
                    jsonObject = new JSONObject(respBody);
                    String sellerNickName = jsonObject.getString("nickname");

                    log.info("title: "+title+", sellerNickName: "+sellerNickName+", hit: "+hit);

                    return AuctionRes.builder()
                            .imageurl(imageurl)
                            .title(title)
                            .sellerNickName(sellerNickName)
                            .startTime(auction.getStartTime())
                            .hit(hit)
                            .build();
                }))
                .sorted(Comparator.comparing(AuctionRes::getHit).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<AuctionRes> findAllByStartDate() throws RuntimeException{
        return auctionRepository.findAllProceedingByStartDate().stream()
                .map(auction -> streamExceptionHandler(()->{
                    String respBody = isp.getResponsefromOtherServer(MPOFFICE_SERVER_URL+"/api/mpoffice/meme?memeId="+auction.getMemeId());
                    JSONObject jsonObject = new JSONObject(respBody);
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    respBody = isp.getResponsefromOtherServer(MPOFFICE_SERVER_URL+"/api/mpoffice/user/info/"+auction.getSellerId());
                    jsonObject = new JSONObject(respBody);
                    String sellerNickName = jsonObject.getString("nickname");

                    log.info("title: "+title+"sellerNickName: "+sellerNickName);

                    return AuctionRes.builder()
                            .imageurl(imageurl)
                            .title(title)
                            .sellerNickName(sellerNickName)
                            .hit(hit)
                            .build();
                })).collect(Collectors.toList());
    }

    @Override
    public void sendCharacter(WebSocketCharacter dto) {
        simpMessageSendingOperations.convertAndSend("/sub/character/"+dto.getAuctionId(), dto);
    }

    public void sendCurrentPrice(Long auctionId){

    }


    @AllArgsConstructor
    class AuctionStarter extends TimerTask {
        Long auctionId;

        @Override
        @javax.transaction.Transactional
        public void run() {
            log.info("AuctionStarter가 실행되었습니다");
            Auction auction = auctionRepository.findById(auctionId)
                    .orElse(null);
            log.info("실행할 Auction id는 "+auction.getId()+"입니다.");
            if(AuctionStatus.ENROLLED.equals(auction.getStatus())){
                auctionRepository.updateStatusToProceeding(auctionId);
                log.info("경매 번호 "+auction.getId()+"번 경매를 시작했습니다");
            }else{
                log.info("경매 번호 "+auction.getId()+"번 경매를 시작이 실패해서 아직 ENROLLED상태입니다");
            }

        }
    }
    @AllArgsConstructor
    class AuctionTerminater extends TimerTask {
        Long auctionId;

        @Transactional
        @Override
        public void run() {
            log.info("AuctionTerminater가 시작되었습니다");
            Auction auction = auctionRepository.findById(auctionId)
                    .orElse(null);
            log.info("종료할 Auction id는 "+auction.getId()+"입니다.");
            if(AuctionStatus.PROCEEDING.equals(auction.getStatus())){
                auctionRepository.updateStatusToTerminated(auctionId);
                log.info("경매 번호 "+auction.getId()+"번 경매를 종료합니다");
            }else{
                log.info("경매 번호 "+auction.getId()+"번 경매 종료가 실패해서 아직 PROCEEDING 상태입니다");
            }

        }
    }
    public static <T> T streamExceptionHandler(ExceptionSupplier<T> z){
        try{
            return z.get();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
