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
    //역정규화
    @Column(name = "meme_img_url")
    private String memeImgUrl;
    @Column(name = "seller_id")
    private Long sellerId;
    //역정규화
    @Column(name = "seller_nickname")
    private String sellerNickname;

    @DateTimeFormat(pattern = "yyyy-mm-dd`T`HH-mm")
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "starting_price")
    private Long startingPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AuctionStatus status;

    private static final Integer AUCTION_DURATION_MINUTES = 1;
    @Builder
    public Auction(Long memeId, LocalDateTime startTime, Long sellerId,
                   String memeImgUrl, String sellerNickname, Long startingPrice) {
        this.memeId = memeId;
        this.startTime = startTime;
        this.sellerId = sellerId;
        this.memeImgUrl = memeImgUrl;
        this.sellerNickname = sellerNickname;
        this.startingPrice = startingPrice;
        this.status = AuctionStatus.ENROLLED;
    }
    public LocalDateTime getFinishTime(){
        return this.startTime.plusMinutes(Auction.AUCTION_DURATION_MINUTES);
    }
}

