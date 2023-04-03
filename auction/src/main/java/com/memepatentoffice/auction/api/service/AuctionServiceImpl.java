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
import com.memepatentoffice.auction.db.repository.BidRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class AuctionServiceImpl implements AuctionService{
    private final BidRepository bidRepository;

    private final AuctionRepository auctionRepository;
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final InterServiceCommunicationProvider isp;

    public AuctionServiceImpl(AuctionRepository auctionRepository,
                              SimpMessageSendingOperations simpMessageSendingOperations,
                              InterServiceCommunicationProvider interServiceCommunicationProvider,
                              BidRepository bidRepository) {
        this.auctionRepository = auctionRepository;
        this.simpMessageSendingOperations = simpMessageSendingOperations;
        this.isp = interServiceCommunicationProvider;
        this.bidRepository = bidRepository;
    }

    @Transactional
    @Override
    public Long enrollAuction(AuctionCreationReq req) throws NotFoundException{
        if(!isp.existsMemeById(req.getMemeId())) throw new NotFoundException("유효하지 않은 밈 아이디입니다");
        if(!isp.existsUserById(req.getSellerId())) throw new NotFoundException("유효하지 않은 판매자 아이디입니다");

        log.info(req.toString());
        Auction auction = auctionRepository.save(Auction.builder()
                        .memeId(req.getMemeId())
                        .startTime(req.getStartDateTime())
                        .sellerId(req.getSellerId())
                        .status(AuctionStatus.ENROLLED)
                .build());

        ZonedDateTime startZdt = auction.getStartTime()
                .atZone(ZoneId.systemDefault());
        Date startDate = Date.from(startZdt.toInstant());
        ZonedDateTime terminateZdt = auction.getFinishTime()
                .atZone(ZoneId.systemDefault());
        Date terminateDate = Date.from(terminateZdt.toInstant());

        new Timer().schedule(
                new AuctionStarter(auction.getId()),
                startDate
        );
        new Timer().schedule(
                new AuctionTerminater(auction.getId()),
                terminateDate
        );
        return auction.getId();
    }


    @Override
    public void sendChat(WebSocketChatReq req){
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
                    String respBody = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    JSONObject jsonObject = new JSONObject(respBody);
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBid = bidRepository.highestBid(auction.getId())
                            .orElse(0L);
                    log.info(auction.toString());
                    return AuctionRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBid)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                }))
                .sorted(Comparator.comparing(AuctionRes::getHit).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<AuctionRes> findAllProceedingByFinishTimeLatest() throws RuntimeException{
        return auctionRepository.findAllProceedingByFinishTimeLatest().stream()
                .map(auction -> streamExceptionHandler(()->{
                    String respBody = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    JSONObject jsonObject = new JSONObject(respBody);
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBid = bidRepository.highestBid(auction.getId())
                            .orElse(0L);

                    return AuctionRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBid)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                })).collect(Collectors.toList());
    }

    @Override
    public List<AuctionRes> findAllProceedingByFinishTimeOldest() throws RuntimeException{
        return auctionRepository.findAllProceedingByFinishTimeOldest().stream()
                .map(auction -> streamExceptionHandler(()->{
                    String respBody = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    JSONObject jsonObject = new JSONObject(respBody);
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBid = bidRepository.highestBid(auction.getId())
                            .orElse(0L);

                    return AuctionRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBid)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                })).collect(Collectors.toList());
    }

    @Override
    public void sendCharacter(WebSocketCharacter dto) {
        simpMessageSendingOperations.convertAndSend("/sub/character/"+dto.getAuctionId(), dto);
    }

    public void sendCurrentPrice(Long auctionId){
        //TODO: 옥션방에 들어오는 사람들에게 5초에 한번씩 웹소켓 쏴주기
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
