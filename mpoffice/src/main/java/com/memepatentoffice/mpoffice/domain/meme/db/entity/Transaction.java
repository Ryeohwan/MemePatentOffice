package com.memepatentoffice.mpoffice.domain.meme.db.entity;

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
    @Column(name = "transaction_seq", nullable = false)
    private Long id;

    @Column(name = "meme_seq", nullable = false)
    private Long memeSeq;

    @Column(name = "buyer_seq", nullable = false)
    private Long buyerSeq;

    @Column(name = "seller_seq", nullable = false)
    private Long sellerSeq;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}