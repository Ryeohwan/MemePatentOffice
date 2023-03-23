package com.memepatentoffice.auction.db.repository;

import com.memepatentoffice.auction.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidsRepository extends JpaRepository<Bid, Long> {
}
