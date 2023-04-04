package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.dto.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.dto.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.dto.response.AuctionListRes;
import com.memepatentoffice.auction.api.dto.response.AuctionRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;

import java.io.IOException;
import java.util.List;

public interface AuctionService {

    Long registerAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException;
    AuctionRes getInfo(Long auctionId) throws NotFoundException;
    void sendChat(WebSocketChatReq req);
    List<AuctionListRes> findAllByHit() throws NotFoundException;
    List<AuctionListRes> findAllProceedingByFinishTimeLatest() throws NotFoundException;
    List<AuctionListRes> findAllProceedingByFinishTimeOldest() throws NotFoundException;

    void sendCharacter(WebSocketCharacter dto);
}
