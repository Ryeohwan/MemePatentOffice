package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}
