package com.memepatentoffice.mpoffice.domain.meme.db.entity;

import lombok.Getter;

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

}