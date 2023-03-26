package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserMemeLikeId.class)
@Table(name = "user_meme_like")
public class UserMemeLike{
    @EmbeddedId
    private UserMemeLikeId id;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meme_id", nullable = false)
    private Meme meme;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Lob
    @Column(name = "like")
    private like like;
    @Builder
    public UserMemeLike(Meme meme, User user, com.memepatentoffice.mpoffice.db.entity.like like) {
        this.meme = meme;
        this.user = user;
        this.like = like;
    }

    public UserMemeLike() {
    }

}