package com.memepatentoffice.auction.api.service;

import com.google.gson.Gson;
import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.message.WebSocketChatRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.entity.type.AuctionStatus;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.data.jpa.repository.support.QuerydslJpaRepository;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

@Service
@Transactional
@Slf4j
public class AuctionServiceImpl implements AuctionService{
    private Gson gson = new Gson();
    private OkHttpClient client = new OkHttpClient();
    private String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
    private MediaType JSON = MediaType.get("application/json; charset=utf-8");
    private final Integer AUCTION_DURATION_MINUTES = 15;

    private final AuctionRepository auctionRepository;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    public AuctionServiceImpl(AuctionRepository auctionRepository,
                              SimpMessageSendingOperations simpMessageSendingOperations) {
        this.auctionRepository = auctionRepository;
        this.simpMessageSendingOperations = simpMessageSendingOperations;
    }

    @Transactional
    @Override
    public Long enrollAuction(AuctionCreationReq req) throws NotFoundException, IOException {
        //TODO: 밈 번호 유효성 검사, 판매자 유효성 검사
        Auction auction = auctionRepository.save(Auction.builder()
                        .memeId(req.getMemeId())
                        .startTime(req.getStartDateTime())
                        .sellerId(req.getSellerId())
                        .status(AuctionStatus.ENROLLED)
                .build());
        log.info(auction.toString());
        new Timer().schedule(
                new AuctionStarter(auction.getId()),
                Timestamp.valueOf(auction.getStartTime())
        );
        new Timer().schedule(
                new AuctionTerminater(auction.getId()),
                Timestamp.valueOf(auction.getStartTime().plusMinutes(AUCTION_DURATION_MINUTES))
        );
        return auction.getId();
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
    public void sendCharacter(WebSocketCharacter dto) {
        simpMessageSendingOperations.convertAndSend("/sub/character/"+dto.getAuctionId(), dto);
    }

    @AllArgsConstructor
    class AuctionStarter extends TimerTask {
        Long auctionId;

        @Transactional
        @Override
        public void run() {
            log.info("AuctionStarter가 실행되었습니다");
            Auction auction = auctionRepository.findById(auctionId)
                    .orElse(null);
            log.info("실행할 Auction id는 "+auction.getId()+"입니다.");
            auction.start();
            log.info("경매 번호 "+auction.getId()+"번 경매를 시작했습니다");
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
            auction.terminate();
            log.info("경매 번호 "+auction.getId()+"번 경매를 종료했습니다");
        }
    }
}
