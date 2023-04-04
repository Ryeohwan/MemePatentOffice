package com.memepatentoffice.auction.db.entity;

import com.memepatentoffice.auction.db.entity.type.AuctionStatus;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Slf4j
@ToString
@Table(name = "auction")
public class Auction extends BaseEntity{

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @DateTimeFormat(pattern = "yyyy-mm-dd`T`HH-mm")
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "seller_nickname")
    private String sellerNickname;

    @Column(name = "starting_price")
    private Long startingPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AuctionStatus status;

    private static final Integer AUCTION_DURATION_MINUTES = 60*24;
    @Builder
    public Auction(Long memeId, LocalDateTime startTime, Long sellerId,
                   String sellerNickname, Long startingPrice) {
        this.memeId = memeId;
        this.startTime = startTime;
        this.sellerId = sellerId;
        this.sellerNickname = sellerNickname;
        this.startingPrice = startingPrice;
        this.status = AuctionStatus.ENROLLED;
    }
    public LocalDateTime getFinishTime(){
        return this.startTime.plusMinutes(Auction.AUCTION_DURATION_MINUTES);
    }
}

