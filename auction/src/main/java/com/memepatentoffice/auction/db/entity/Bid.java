package com.memepatentoffice.auction.db.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bids")
public class Bid extends BaseEntity{

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "auction_id", nullable = false)
    private Long auctionId;

    @Column(name = "askingprice")
    private Long askingprice;

    @CreatedDate
    @Column(name = "created_at")
    private Timestamp createdAt;


}