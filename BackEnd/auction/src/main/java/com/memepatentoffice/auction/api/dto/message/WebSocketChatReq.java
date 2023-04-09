package com.memepatentoffice.auction.api.dto.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketChatReq {
    private Long auctionId;
    private String nickname;
    private String profileImgUrl;
    private String message;

}
