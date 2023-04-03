package com.memepatentoffice.auction.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BidReq {
    private String userId;

    private Long auctionId;

    private Long askingprice;
}
