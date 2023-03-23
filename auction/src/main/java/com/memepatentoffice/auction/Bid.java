package com.memepatentoffice.auction;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bids")
public class Bid {
    @Id
    @Column(name = "bids_id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "auction_id", nullable = false)
    private Long auctionId;

    @Column(name = "askingprice")
    private Long askingprice;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

    public Long getAskingprice() {
        return askingprice;
    }

    public void setAskingprice(Long askingprice) {
        this.askingprice = askingprice;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}