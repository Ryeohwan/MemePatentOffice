package com.memepatentoffice.auction;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "chat")
public class Chat {
    @Id
    @Column(name = "chat_id", nullable = false)
    private Long id;

    @Column(name = "auction_id", nullable = false)
    private Long auctionId;

    @Lob
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "message")
    private String message;

    @Column(name = "created_at")
    private Timestamp createdAt;

}