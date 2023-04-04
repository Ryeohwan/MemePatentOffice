package com.memepatentoffice.auction.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BidReq {
    private Long auctionId;
    private Long userId;
    private Long askingprice;
}
