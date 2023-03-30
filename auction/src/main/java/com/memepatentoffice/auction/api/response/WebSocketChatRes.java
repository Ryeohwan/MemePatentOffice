package com.memepatentoffice.auction.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketChatRes {
    private Long auctionId;
    private String nickName;
    private String message;
    private LocalDateTime createdAt;

}
