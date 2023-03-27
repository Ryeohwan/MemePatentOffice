package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;

import java.util.List;

public interface AuctionService {

    public Long save(Long memeId);
    public List<Auction> findAll();
    public Auction findById(Long id) throws NotFoundException;
}
