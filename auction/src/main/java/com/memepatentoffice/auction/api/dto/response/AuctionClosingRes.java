package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime finishTime;
}
