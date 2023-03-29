package com.memepatentoffice.auction.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
public class AuctionTerminatedRes {
    private String imageurl;
    private String title;
    private String content;
    private String sellerName;
    private String buyerName;
    private LocalDateTime startTime;
    private Long price;
}
