package com.memepatentoffice.auction.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class AuctionRes {
    private String imageurl;
    private String title;
    private String sellerNickName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long currentMaxPrice;
    private int hit;
}
