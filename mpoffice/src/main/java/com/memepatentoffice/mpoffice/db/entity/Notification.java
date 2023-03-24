package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Entity
public class Notification {
    @Id
    @Column(name = "notification_id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Lob
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "message")
    private String message;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "nft_id")
    private Long nftId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

}