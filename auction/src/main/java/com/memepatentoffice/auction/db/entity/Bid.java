package com.memepatentoffice.auction.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private LocalDateTime createdAt;


}