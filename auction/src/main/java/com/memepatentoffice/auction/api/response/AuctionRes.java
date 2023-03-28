package com.memepatentoffice.auction.api.response;

import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.entity.type.Status;

import java.sql.Timestamp;

public class AuctionRes {
    private Long memeId;
    private Timestamp createdAt;
    private Status status;
    public AuctionRes(Auction auction){
        this.memeId= auction.getMemeId();
        this.createdAt=auction.getCreatedAt();
        this.status=auction.getStatus();
    }
}
