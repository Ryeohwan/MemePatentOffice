package com.memepatentoffice.auction.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketChatReq {
    public Long auctionId;
    public String nickname;
    public String message;

}
