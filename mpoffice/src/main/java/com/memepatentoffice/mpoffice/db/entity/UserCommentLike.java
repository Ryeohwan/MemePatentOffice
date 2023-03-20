package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Entity
public class UserCommentLike {
    @EmbeddedId
    private UserCommentLikeId id;

    @MapsId("commentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Lob
    @Column(name = "`like`")
    private String like;

    @Builder
    public UserCommentLike(UserCommentLikeId id, Comment comment, User user, String like) {
        this.id = id;
        this.comment = comment;
        this.user = user;
        this.like = like;
    }

    public UserCommentLike() {
    }
}