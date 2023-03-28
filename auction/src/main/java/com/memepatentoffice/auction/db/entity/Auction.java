package com.memepatentoffice.auction.db.entity;

import com.memepatentoffice.auction.db.entity.type.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "auction")
public class Auction extends BaseEntity{

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @CreatedDate
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "status")
    private Status status = Status.PROCEEDING;

    public Auction(Long memeId){
        this.memeId = memeId;
    }
    public void terminate(){
        this.status = Status.TERMINATED;
    }
}

