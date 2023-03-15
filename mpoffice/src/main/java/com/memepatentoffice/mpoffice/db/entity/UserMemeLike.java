package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class UserMemeLike {
    @EmbeddedId
    private UserMemeLikeId id;

    @MapsId("memeSeq")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meme_seq", nullable = false)
    private Meme memeSeq;

    @MapsId("userSeq")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_seq", nullable = false)
    private User userSeq;

}