package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.memepatentoffice.auction.api.dto.BiddingHistory;

import java.time.LocalDateTime;
import java.util.List;

public class AuctionRes {
    String sellerNickname;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm")
    LocalDateTime finishTime;
    String startingPrice;
    List<BiddingHistory> biddingHistory;
}
