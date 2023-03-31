package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.message.WebSocketTransactionRes;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.response.AuctionCreationResultRes;
import com.memepatentoffice.auction.api.message.WebSocketChatRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class AuctionServiceImpl implements AuctionService{
    @Override
    public AuctionCreationResultRes enrollAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException {
        return null;
    }

    private final SimpMessageSendingOperations simpMessageSendingOperations;

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

//    private Gson gson = new Gson();
//    private OkHttpClient client = new OkHttpClient();
//    private String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
//    private MediaType JSON = MediaType.get("application/json; charset=utf-8");
//
//    private final AuctionRepository auctionRepository;
//
//    @Transactional
//    @Override
//    public AuctionCreationResultRes enrollAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException {
//        //밈이 경매중인지 확인
////        String json = "";
////        RequestBody requestBody = RequestBody.create(json, JSON);
////        Request request = new Request.Builder()
////                .url(MPOFFICE_SERVER_URL+"/meme/"+auctionCreationReq.getMemeId())
////                .build();
////        try(Response response = client.newCall(request).execute()){
////            if(response.isSuccessful()){
////                JsonObject jsonObject = new JsonObject(response.body().string());
////                String status = jsonObject.get("status");
////                log.info("enrollAuction: 밈이 경매중인지 확인, status: "+status);
////                if(status.equals("INAUCTION")){//나중에 려환님 Enum으로 변경.
////                    throw new NotFoundException("이 밈은 이미 경매중입니다");
////                }
////                String ownerId = jsonObject.get("ownerId");
////                if(!ownerId.equals(auctionCreationReq.getSellerId())){
////                    throw new NotFoundException("밈의 소유자와 팔려는 사람이 다릅니다");
////                }
////            }
////            else if(response is 404 NotFound){
////                throw new NotFoundException("유효하지 않은 밈입니다");
////            }
//
//
////        }
////        //유저가 살아 있는지 확인
////        json = "";
////        requestBody = RequestBody.create(json, JSON);
////        request = new Request.Builder()
////                .url(MPOFFICE_SERVER_URL+"/user/info/"+auctionCreationReq.getSellerId())
////                .build();
////        try(Response response = client.newCall(request).execute()){
////            if(response.isSuccessful()){
////                String status = new JsonObject(response.body().string()).get("status");
////                log.info("enrollAuction: 유저가 살아있는지 확인, status: "+status);
////                if(status.equals("WITHDRAWAL")){//나중에 Enum으로 변경.
////                    return AuctionCreationResultRes.builder()
////                            .status("FAIL")
////                            .message("유효하지 않은 유저입니다").build();
////                }
////            }
////            else if(response is 404 NotFound){
////                return AuctionCreationResultRes.builder()
////                        .status("FAIL")
////                        .message("유효하지 않은 유저입니다").build();
////            }
////        }
////        //여기까지 왔으면 등록가능
////        LocalDateTime startTime = auctionCreationReq.getStartDateTime();
////        LocalDateTime endTime = startTime.plusMinutes(15);
////        Long auctionId = auctionRepository.save(
////                Auction.builder()
////                        .memeId(auctionCreationReq.getMemeId())
////                        .startTime(startTime)
////                        .endTime(endTime)
////                        .sellerId(auctionCreationReq.getSellerId())
////                        .build()
////        ).getId();
////        return AuctionCreationResultRes.builder()
////                .status("SUCCESS")
////                .build();
//    return null;
//    }

}
