package com.memepatentoffice.auction.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class AuctionCreationResultRes {
    String status;
    String message;
}
