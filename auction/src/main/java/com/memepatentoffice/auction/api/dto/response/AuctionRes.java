package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.memepatentoffice.auction.api.dto.BiddingHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@ToString
public class AuctionRes {
    @JsonFormat //TODO: 이거 빼면 finishTime 만 응답으로 가는 이유 찾기
    String sellerNickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm", timezone = "Asia/Seoul")
    LocalDateTime finishTime;
    @JsonFormat
    Long startingPrice;

    @JsonFormat
    String memeImgUrl;

    @JsonFormat
    List<BiddingHistory> biddingHistory;
}
