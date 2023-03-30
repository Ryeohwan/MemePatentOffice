package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.message.WebSocketTransaction;
import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.response.AuctionCreationResultRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;

import java.io.IOException;

public interface AuctionService {

    AuctionCreationResultRes enrollAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException;
    void sendChat(WebSocketChatReq req);

    void sendCharacter(WebSocketCharacter vo);

    void sendTransaction(WebSocketTransaction vo);
}
