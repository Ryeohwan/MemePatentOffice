package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserMemeAuctionAlertId.class)
public class UserMemeAuctionAlert {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meme_id", nullable = false)
    private Meme meme;


    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}