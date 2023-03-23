package com.memepatentoffice.auction;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "auction")
public class Auction {
    @Id
    @Column(name = "auction_id", nullable = false)
    private Long id;

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @Column(name = "start_datetime")
    private Timestamp startDatetime;

    @Column(name = "end_datetime")
    private Timestamp endDatetime;

    @Column(name = "created_at")
    private Timestamp createdAt;

}