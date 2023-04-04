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
    String sellerNickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm")
    LocalDateTime finishTime;
    Long startingPrice;
    List<BiddingHistory> biddingHistory;
}
