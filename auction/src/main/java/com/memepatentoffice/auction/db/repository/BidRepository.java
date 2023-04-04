package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.db.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    Optional<Bid> findTopByAuctionIdOrderByAskingpriceDesc(@Param("auctionId")Long auctionId);

    List<Bid> findByAuctionIdOrderByCreatedAtDesc(@Param("auctionId") Long auctionId);
}