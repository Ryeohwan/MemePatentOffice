package com.memepatentoffice.auction.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuctionClosingRes {
    private Long memeId;
    private Long sellerUserId;
    private Long buyerUserId;

    private String fromAccount;
    private String toAccount;
    private Long memeTokenId;
    private Long price;
}
