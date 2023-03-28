package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import com.memepatentoffice.auction.util.AuctionStarter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Timer;

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService auctionService;
    private final AuctionRepository auctionRepository;

    @PostMapping("/")
    public ResponseEntity<?> enrollAuction(@RequestBody AuctionCreationReq auctionCreationReq) throws NotFoundException{
        auctionService.enrollAuction(auctionCreationReq);
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
