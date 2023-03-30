package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.request.WebSocketChatReq;
import com.memepatentoffice.auction.api.response.AuctionCreationResultRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;

import java.io.IOException;

public interface AuctionService {

    public AuctionCreationResultRes enrollAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException;
    public void sendWebSocket(WebSocketChatReq webSocketChatReq);
}
