package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Query("select a from Auction a where a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING")
    List<Auction> findAllProceeding();

    @Query("select a from Auction a where a.sellerNickname = :sellerNickname and a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING")
    List<Auction> findAllBySellerNickname(@Param("sellerNickname")String sellerNickname);

    @Query("select a from Auction a where a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING order by a.startTime")
    List<Auction> findAllProceedingByFinishTimeOldest();

    @Query("select a from Auction a where a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING order by a.startTime desc")
    List<Auction> findAllProceedingByFinishTimeLatest();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Auction a set a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.PROCEEDING where a.id = :auctionId")
    void updateStatusToProceeding(@Param("auctionId") Long auctionId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Auction a set a.status = com.memepatentoffice.auction.db.entity.type.AuctionStatus.TERMINATED where a.id = :auctionId")
    void updateStatusToTerminated(@Param("auctionId") Long auctionId);

    List<Auction> findByMemeId(@Param("memeId") Long memeId);
}
