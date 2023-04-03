package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.request.BidReq;
import com.memepatentoffice.auction.api.service.BidService;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bid")
@RequiredArgsConstructor
public class BidController {
    private BidService bidService;

    public ResponseEntity<?> bid(@RequestBody BidReq bidReq) throws NotFoundException, BiddingException {
        return ResponseEntity.status(HttpStatus.OK).body(bidService.bid(bidReq));
    }


}
