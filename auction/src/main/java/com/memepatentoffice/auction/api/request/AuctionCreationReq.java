package com.memepatentoffice.auction.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionCreationReq {
    private Long memeId;
    private LocalDateTime startDateTime;
    private Long sellerId;

}
