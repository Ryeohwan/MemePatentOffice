package com.memepatentoffice.auction.api.service;
import com.memepatentoffice.auction.api.request.BidReq;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;

public interface BidService {

    Long bid(BidReq bidReq) throws NotFoundException, BiddingException;


}
