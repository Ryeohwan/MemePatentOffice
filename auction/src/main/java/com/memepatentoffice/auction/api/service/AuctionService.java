package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.dto.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.dto.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.dto.request.BidReq;
import com.memepatentoffice.auction.api.dto.response.AuctionClosingRes;
import com.memepatentoffice.auction.api.dto.response.AuctionListRes;
import com.memepatentoffice.auction.api.dto.response.AuctionRes;
import com.memepatentoffice.auction.api.dto.response.MemeRes;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;

import java.io.IOException;
import java.util.List;

public interface AuctionService {

    Long registerAuction(AuctionCreationReq auctionCreationReq) throws NotFoundException, IOException;
    AuctionRes getInfo(Long auctionId) throws NotFoundException;
    Long bid(BidReq bidReq) throws NotFoundException, BiddingException;

    List<AuctionListRes> findAllBySellerNickname(String sellerNickname) throws NotFoundException;
    List<AuctionListRes> findAllByHit() throws NotFoundException;
    List<AuctionListRes> findAllProceedingByFinishTimeLatest() throws NotFoundException;
    List<AuctionListRes> findAllProceedingByFinishTimeOldest() throws NotFoundException;
    List<AuctionListRes> getListForCarousel();

    MemeRes searchByMemeId(Long memeId);
    AuctionClosingRes getResultById(Long auctionId) throws Exception;

    void sendChat(WebSocketChatReq req);
    void sendCharacter(WebSocketCharacter dto);
}
