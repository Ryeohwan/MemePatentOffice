package com.memepatentoffice.auction.api.message;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WebSocketTransactionRes {
    private Long auctionId;
    private String nickname;
    private Long price;
    private LocalDateTime date;
}
