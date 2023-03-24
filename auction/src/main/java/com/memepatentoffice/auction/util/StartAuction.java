package com.memepatentoffice.auction.util;

import com.memepatentoffice.auction.api.service.AuctionService;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.TimerTask;

@AllArgsConstructor
@Builder
public class StartAuction extends TimerTask{
    private AuctionService auctionService;
    private Long memeId;

    @Override
    public void run() {
        auctionService.save(memeId);
    }
}
