package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Entity
public class Transaction {
    @Id
    @Column(name = "transaction_id", nullable = false)
    private Long id;

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @Column(name = "buyer_id", nullable = false)
    private Long buyerId;

    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}