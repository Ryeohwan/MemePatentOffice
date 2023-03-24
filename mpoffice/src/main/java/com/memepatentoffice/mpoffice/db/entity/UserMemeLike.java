package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Entity
public class UserMemeLike {
    @EmbeddedId
    private UserMemeLikeId id;

    @MapsId("memeId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meme_id", nullable = false)
    private Meme meme;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Lob
    @Column(name = "like")
    private like like;

    @Builder
    public UserMemeLike(UserMemeLikeId id, Meme meme, User user, like like) {
        this.id = id;
        this.meme = meme;
        this.user = user;
        this.like = like;
    }

    public UserMemeLike() {
    }
}