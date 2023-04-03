package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Query("select a from Auction a where where a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING")
    List<Auction> findAllProceeding();

    @Query("select a from Auction a where a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING order by a.startTime")
    List<Auction> findAllProceedingByStartDate();
}
