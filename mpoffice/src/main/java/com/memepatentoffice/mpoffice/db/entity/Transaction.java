package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Transaction extends BaseEntity{

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @Column(name = "buyer_id", nullable = false)
    private Long buyerId;

    @Column(name = "seller_id", nullable = false)
    private Long sellerId;

}