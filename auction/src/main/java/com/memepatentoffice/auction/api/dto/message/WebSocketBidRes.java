package com.memepatentoffice.auction.api.dto.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
public class WebSocketBidRes {
    @JsonFormat
    String nickname;
    @JsonFormat
    Long askingPrice;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    LocalDateTime createdAt;
}
