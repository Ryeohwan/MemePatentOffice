package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BidController {
    private BidService bidService;
}
