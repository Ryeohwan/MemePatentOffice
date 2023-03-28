package com.memepatentoffice.auction.util;

import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.TimerTask;

@AllArgsConstructor
@Builder
public class AuctionTerminator extends TimerTask{
    private AuctionRepository auctionRepository;
    private Long auctionId;
    @Override
    public void run(){
        Auction auction = auctionRepository.findById(auctionId).orElse();
        auction.terminate();
    }
}
