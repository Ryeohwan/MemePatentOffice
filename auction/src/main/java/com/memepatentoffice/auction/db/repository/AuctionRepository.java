package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Override
    Optional<Auction> findById(Long id);
}
