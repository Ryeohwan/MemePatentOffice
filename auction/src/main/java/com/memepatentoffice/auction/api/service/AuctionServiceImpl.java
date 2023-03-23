package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService{
    private AuctionRepository auctionRepository;
}
