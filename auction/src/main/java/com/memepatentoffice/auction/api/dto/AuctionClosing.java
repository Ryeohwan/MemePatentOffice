package com.memepatentoffice.auction.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class AuctionClosing {
    private Long memeId;
    private Long buyerId;
    private Long sellerId;
    private String createdAt;
    private Long price;
}
