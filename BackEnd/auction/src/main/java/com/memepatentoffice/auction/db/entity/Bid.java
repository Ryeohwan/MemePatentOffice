package com.memepatentoffice.auction.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "bids")
@EntityListeners(AuditingEntityListener.class)
public class Bid extends BaseEntity{
    @Column(name = "auction_id", nullable = false)
    private Long auctionId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "nickname", nullable = false)
    private String nickname;
    @Column(name = "askingprice")
    private Long askingprice;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Builder
    public Bid(Long auctionId, Long userId, String nickname, Long askingprice) {
        this.auctionId = auctionId;
        this.userId = userId;
        this.nickname = nickname;
        this.askingprice = askingprice;
    }


}