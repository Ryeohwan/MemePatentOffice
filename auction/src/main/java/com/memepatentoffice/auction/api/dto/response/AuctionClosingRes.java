package com.memepatentoffice.auction.api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuctionClosingRes {
    private String fromAccount;
    private String toAccount;
    private Long memeTokenId;
    private Long price;
}
