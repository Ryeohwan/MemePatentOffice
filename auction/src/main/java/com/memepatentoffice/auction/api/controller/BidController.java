package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
public class BidController {
    private BidService bidService;
}
