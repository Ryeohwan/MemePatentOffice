package com.memepatentoffice.auction.api.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuctionCreationReq {
    private Long memeId;
    private LocalDateTime startDateTime;
    private Long sellerId;
    private Long startingPrice;

}
