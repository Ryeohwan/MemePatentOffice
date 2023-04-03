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
@AllArgsConstructor
@Builder
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
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AuctionStatus status;

    public boolean start(){
        if(AuctionStatus.ENROLLED.equals(this.status)){ //Enum에 equals 사용 시 내부적으로 ==비교를 하긴 함
            this.status = AuctionStatus.PROCEEDING;
            return true;
        }
        else{
            log.warn("경매가 대기중이 아닌데 진행중으로 변경하려 합니다");
            log.warn("현재 상태: "+this.status.toString());
            return false;
        }
    }
    public boolean terminate(){
        if(AuctionStatus.PROCEEDING.equals(this.status)){ //Enum에 equals 사용 시 내부적으로 ==비교를 하긴 함
            this.status = AuctionStatus.TERMINATED;
            return true;
        }
        else{
            log.warn("경매가 진행중이 아닌데 끝내려고 합니다");
            log.warn("현재 상태"+this.status.toString());
            return false;
        }
    }
}

