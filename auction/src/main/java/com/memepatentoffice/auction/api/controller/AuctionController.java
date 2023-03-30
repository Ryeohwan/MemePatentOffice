package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.request.WebSocketChatReq;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService auctionService;

    @PostMapping("/")
    public ResponseEntity<?> enrollAuction(@RequestBody AuctionCreationReq auctionCreationReq) throws IOException, NotFoundException{
        auctionService.enrollAuction(auctionCreationReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @MessageMapping("/app")
    public ResponseEntity<String> sendChat(WebSocketChatReq webSocketChatReq) throws NotFoundException{
        auctionService.sendWebSocket(webSocketChatReq);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
