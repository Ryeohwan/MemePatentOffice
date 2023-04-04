package com.memepatentoffice.auction.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.memepatentoffice.auction.api.dto.AuctionClosing;
import com.memepatentoffice.auction.api.dto.BiddingHistory;
import com.memepatentoffice.auction.api.dto.message.WebSocketBidRes;
import com.memepatentoffice.auction.api.dto.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.dto.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatRes;
import com.memepatentoffice.auction.api.dto.request.BidReq;
import com.memepatentoffice.auction.api.dto.response.AuctionListRes;
import com.memepatentoffice.auction.api.dto.response.AuctionRes;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.common.util.ExceptionSupplier;
import com.memepatentoffice.auction.common.util.InterServiceCommunicationProvider;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.entity.Bid;
import com.memepatentoffice.auction.db.entity.type.AuctionStatus;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import com.memepatentoffice.auction.db.repository.BidRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicReference;
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
    public Long registerAuction(AuctionCreationReq req) throws NotFoundException{
        JSONObject jsonObject = isp.findMemeById(req.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
        String memeImgUrl = jsonObject.getString("memeImage");

        jsonObject = isp.findUserById(req.getSellerId())
                .orElseThrow(()->new NotFoundException("sellerId가 유효하지 않습니다"));
        String sellerNickname = jsonObject.getString("nickname");

        log.info(req.toString());
        Auction auction = auctionRepository.save(Auction.builder()
                        .memeId(req.getMemeId())
                        .memeImgUrl(memeImgUrl)
                        .startTime(req.getStartDateTime())
                        .sellerId(req.getSellerId())
                        .sellerNickname(sellerNickname)
                        .startingPrice(req.getStartingPrice())
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
    public AuctionRes getInfo(Long auctionId) throws NotFoundException {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(()->new NotFoundException("auctionId가 유효하지 않습니다"));

        AuctionRes auctionRes =  AuctionRes.builder()
                .sellerNickname(auction.getSellerNickname())
                .finishTime(auction.getFinishTime())
                .startingPrice(auction.getStartingPrice())
                .memeImgUrl(auction.getMemeImgUrl())
                .biddingHistory(
                        bidRepository.findByAuctionId(auctionId).stream()
                                .map((bid)-> BiddingHistory.builder()
                                        .nickname(bid.getNickname())
                                        .price(bid.getAskingprice())
                                        .time(bid.getCreatedAt())
                                        .build()
                                ).collect(Collectors.toList())
                ).build();
        log.info(auctionRes.toString());
        return auctionRes;
    }
    @Override
    public Long bid(BidReq bidReq) throws NotFoundException, BiddingException {
        Auction auction = auctionRepository.findById(bidReq.getAuctionId())
                .orElseThrow(()->new NotFoundException("auctionId가 유효하지 않습니다"));
        if(!AuctionStatus.PROCEEDING.equals(auction.getStatus())){
            throw new BiddingException("아직 시작되지 않았거나 종료된 경매입니다");
        }
        JSONObject jsonObject = isp.findUserById(bidReq.getUserId())
                .orElseThrow(()->new NotFoundException("sellerId가 유효하지 않습니다"));
        String nickname = jsonObject.getString("nickname");

        bidRepository.findTopByAuctionIdOrderByAskingpriceDesc(bidReq.getAuctionId())
                .ifPresent((currentTopBid) -> streamExceptionHandler(() -> {
                            if (!(bidReq.getAskingprice() > currentTopBid.getAskingprice())) {
                                throw new BiddingException("제안하는 가격이 현재 호가보다 낮아서 안됩니다");
                            }
                            return currentTopBid;
                        }
                ));

         Bid bid = bidRepository.save(
                Bid.builder()
                        .auctionId(bidReq.getAuctionId())
                        .userId(bidReq.getUserId())
                        .nickname(nickname)
                        .askingprice(bidReq.getAskingprice()).build()
        );
        WebSocketBidRes res = WebSocketBidRes.builder()
                .nickname(bid.getNickname())
                .askingPrice(bid.getAskingprice())
                .createdAt(bid.getCreatedAt())
                .build();

        simpMessageSendingOperations.convertAndSend("/sub/chat/"+bidReq.getAuctionId(), res);
        return bid.getId();
    }

    @Override
    public List<AuctionListRes> findAllByHit(){
        return auctionRepository.findAllProceeding().stream()
                .map(auction -> streamExceptionHandler(()->{
                    JSONObject jsonObject = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBidPrice = auction.getStartingPrice();
                    Optional<Bid> highestBid = bidRepository.findTopByAuctionIdOrderByAskingpriceDesc(auction.getId());
                    if(highestBid.isPresent()) highestBidPrice=highestBid.get().getAskingprice();

                    return AuctionListRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBidPrice)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                }))
                .sorted(Comparator.comparing(AuctionListRes::getHit).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<AuctionListRes> findAllProceedingByFinishTimeLatest() throws RuntimeException{
        return auctionRepository.findAllProceedingByFinishTimeLatest().stream()
                .map(auction -> streamExceptionHandler(()->{
                    JSONObject jsonObject = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBidPrice = auction.getStartingPrice();
                    Optional<Bid> highestBid = bidRepository.findTopByAuctionIdOrderByAskingpriceDesc(auction.getId());
                    if(highestBid.isPresent()) highestBidPrice=highestBid.get().getAskingprice();

                    return AuctionListRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBidPrice)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                })).collect(Collectors.toList());
    }

    @Override
    public List<AuctionListRes> findAllProceedingByFinishTimeOldest() throws RuntimeException{
        return auctionRepository.findAllProceedingByFinishTimeOldest().stream()
                .map(auction -> streamExceptionHandler(()->{
                    JSONObject jsonObject = isp.findMemeById(auction.getMemeId()).orElseThrow(()->new NotFoundException("유효하지 않은 밈 아이디입니다"));
                    String title = jsonObject.getString("title");
                    String imageurl = jsonObject.getString("memeImage");
                    int hit = jsonObject.getInt("searched");

                    Long highestBidPrice = auction.getStartingPrice();
                    Optional<Bid> highestBid = bidRepository.findTopByAuctionIdOrderByAskingpriceDesc(auction.getId());
                    if(highestBid.isPresent()) highestBidPrice=highestBid.get().getAskingprice();

                    return AuctionListRes.builder()
                            .memeId(auction.getMemeId())
                            .auctionId(auction.getId())
                            .title(title)
                            .finishTime(auction.getFinishTime())
                            .highestBid(highestBidPrice)
                            .imgUrl(imageurl)
                            .hit(hit)
                            .build();
                })).collect(Collectors.toList());
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
    public void sendCharacter(WebSocketCharacter dto) {
        simpMessageSendingOperations.convertAndSend("/sub/character/"+dto.getAuctionId(), dto);
    }


    @AllArgsConstructor
    class AuctionStarter extends TimerTask {
        Long auctionId;

        @Override
        @Transactional
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
            //경매 체결하기
            log.info("AuctionTerminater가 시작되었습니다");
            Auction auction = auctionRepository.findById(auctionId)
                    .orElse(null);
            log.info("종료할 Auction id는 "+auction.getId()+"입니다.");
            //1. 스마트 컨트랙트 호출
            //2. mpoffice에 체결 요청 보냄
            AtomicReference<Long> buyerId = new AtomicReference<>(0L);
            AtomicReference<Long> price = new AtomicReference<>(0L);
            bidRepository.findTopByAuctionIdOrderByAskingpriceDesc(auctionId)
                    .ifPresent(currentTopBid->{
                        buyerId.set(currentTopBid.getUserId());
                        price.set(currentTopBid.getAskingprice());
                    });
            AuctionClosing auctionClosing = AuctionClosing.builder()
                    .memeId(auction.getMemeId())
                    .buyerId(buyerId.get())
                    .sellerId(auction.getSellerId())
                    .createdAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .price(price.get())
                    .build();
            try{
                isp.addTransaction(auctionClosing);
            }catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            //3. state 바꾸기
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
