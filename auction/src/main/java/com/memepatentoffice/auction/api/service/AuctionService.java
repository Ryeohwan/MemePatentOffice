package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.response.AuctionRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;

import java.util.List;

public interface AuctionService {

    public Long enrollAuction(AuctionCreationReq auctionCreationReq);
    public List<AuctionRes> findAll();
    public AuctionRes findById(Long id) throws NotFoundException;
    public Long terminate(Long id);
}
