package com.memepatentoffice.auction.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class AuctionRes {
    private Long memeId;
    private Long auctionId;
    private String title;
    private LocalDateTime finishTime;
    private Long highestBid;
    private String imgUrl;
    private int hit;
}
