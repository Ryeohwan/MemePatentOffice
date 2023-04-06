package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class AuctionListRes {
    private Long memeId;
    private Long auctionId;
    private String title;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime finishTime;
    private Long highestBid;
    private String imgUrl;
    private int hit;
}
