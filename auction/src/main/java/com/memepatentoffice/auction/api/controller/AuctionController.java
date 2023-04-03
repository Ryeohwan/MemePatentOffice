package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.response.AuctionRes;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.NotFoundException;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
@Slf4j
public class AuctionController {
    private final AuctionService auctionService;
    @ApiOperation(value="경매 등록", notes = "경매를 예약합니다. 예약한 시간에 경매가 시작되고, 시작 후 1분 후에 끝납니다.")
    @PostMapping("/enroll")
    public ResponseEntity<?> enrollAuction(@RequestBody AuctionCreationReq auctionCreationReq) throws IOException, NotFoundException{
        return ResponseEntity.status(HttpStatus.CREATED).body(auctionService.enrollAuction(auctionCreationReq));
    }
    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestParam String sort) throws NotFoundException{
        List<AuctionRes> auctionList = null;
        if("popular".equals(sort)){
            auctionList = auctionService.findAllByHit();
        }
        else if("latest".equals(sort)){
            auctionList = auctionService.findAllProceedingByFinishTimeLatest();
        }
        else if("oldest".equals(sort)){
            auctionList = auctionService.findAllProceedingByFinishTimeOldest();
        }
        return ResponseEntity.status(HttpStatus.OK).body(auctionList);
    }

    @PostMapping("/end")
    public ResponseEntity<?> endAuction(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @MessageMapping("/chat")
    public void sendChat(WebSocketChatReq req){
        auctionService.sendChat(req);
    }

    @MessageMapping("/character")
    public void sendCharacter(WebSocketCharacter dto){
        auctionService.sendCharacter(dto);
    }
}
