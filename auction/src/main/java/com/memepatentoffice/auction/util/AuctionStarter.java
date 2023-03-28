package com.memepatentoffice.auction.util;

import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.TimerTask;

@AllArgsConstructor
@Builder
public class AuctionStarter extends TimerTask{
    private AuctionRepository auctionRepository;
    private Long memeId;

    @Override
    public void run() {
        auctionRepository.save(new Auction(memeId));
    }
}
