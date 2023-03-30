package com.memepatentoffice.auction.api.message;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WebSocketTransaction {
    private Long auctionId;
}
