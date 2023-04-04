package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.dto.request.BidReq;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.common.util.InterServiceCommunicationProvider;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.entity.Bid;
import com.memepatentoffice.auction.db.entity.type.AuctionStatus;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import com.memepatentoffice.auction.db.repository.BidRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BidServiceImpl implements BidService {

    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final InterServiceCommunicationProvider isp;
    @Override
    public Long bid(BidReq bidReq) throws NotFoundException, BiddingException {
        Auction auction = auctionRepository.findById(bidReq.getAuctionId())
                .orElseThrow(()->new NotFoundException("auctionId가 유효하지 않습니다"));
        if(!AuctionStatus.PROCEEDING.equals(auction.getStatus())){
            throw new BiddingException("아직 시작되지 않았거나 종료된 경매입니다");
        }
        String respBody = isp.findUserById(bidReq.getUserId())
                .orElseThrow(()->new NotFoundException("sellerId가 유효하지 않습니다"));
        JSONObject jsonObject = new JSONObject(respBody);
        String nickname = jsonObject.getString("nickname");

        Bid currentTopBid = bidRepository.findTopByOrderByCreatedAtDesc();
        if(!(bidReq.getAskingprice() > currentTopBid.getAskingprice())){
            throw new BiddingException("제안하는 가격이 현재 호가보다 낮아서 안됩니다");
        }

        return bidRepository.save(
            Bid.builder()
                .auctionId(bidReq.getAuctionId())
                .userId(bidReq.getUserId())
                .nickname(nickname)
                .askingprice(bidReq.getAskingprice()).build()
        ).getId();
    }
}
