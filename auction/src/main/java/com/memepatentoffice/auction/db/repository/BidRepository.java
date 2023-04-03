package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.db.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
    Bid findTopByCreatedAtDesc();
}