package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuctionController {
    private AuctionService auctionService;
}
