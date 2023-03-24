package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.util.StartAuction;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Timer;

@RestController("/api/auction")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService auctionService;

    @PostMapping("/")
    public ResponseEntity<?> enrollAuction(@RequestBody AuctionCreationReq auctionCreationReq){
        LocalDateTime startLocalDateTime = auctionCreationReq.getStartDateTime();
        Date startDate = Timestamp.valueOf(startLocalDateTime);
        new Timer().schedule(
                StartAuction.builder()
                        .auctionService(auctionService)
                        .memeId(auctionCreationReq.getMemeId())
                        .build(),
                startDate);
        //기다리는지 비동기인지?
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
    @GetMapping("/")
    public ResponseEntity<?> getAuctionAll(){
        return ResponseEntity.status(HttpStatus.OK).body(
                auctionService.findAll()
        );
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getAuctionById(@PathVariable Long auctionId) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(
          auctionService.findById(auctionId)
        );
    }

}
