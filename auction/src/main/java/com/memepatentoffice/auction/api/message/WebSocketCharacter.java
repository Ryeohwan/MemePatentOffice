package com.memepatentoffice.auction.api.message;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WebSocketCharacter {
    private Long auctionId;
    private String nickname;
    private Double x,y,z;
    private Status status;
}
