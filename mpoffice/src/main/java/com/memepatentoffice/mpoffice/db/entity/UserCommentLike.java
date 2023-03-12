package com.memepatentoffice.mpoffice.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserCommentLikeId.class)
public class UserCommentLike {

    @Id
    @ManyToOne
    @JoinColumn(name="user_id", columnDefinition = "INT UNSIGNED")
    User user;

    @Id
    @ManyToOne
    @JoinColumn(name="comment_id", columnDefinition = "INT UNSIGNED")
    Comment comment;
}
