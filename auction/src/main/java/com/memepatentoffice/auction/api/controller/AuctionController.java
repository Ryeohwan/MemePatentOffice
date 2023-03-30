package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.message.WebSocketTransaction;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
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

    @MessageMapping("/chat")
    public void sendChat(WebSocketChatReq req) throws NotFoundException{
        auctionService.sendChat(req);
    }

    @MessageMapping("/character")
    public void sendCharacter(WebSocketCharacter vo) throws NotFoundException{
        auctionService.sendCharacter(vo);
    }
    @MessageMapping("/transaction")
    public void sendTransaction(WebSocketTransaction vo) throws NotFoundException{
        auctionService.sendTransaction(vo);
    }
}
