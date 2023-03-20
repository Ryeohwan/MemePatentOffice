package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserCommentLikeId;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
public class CommentLikeRequest {
    private UserCommentLikeId id;
    private Comment comment;
    private User user;
    private String like;

    public void setId(UserCommentLikeId id) {
        this.id = id;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setLike(String like) {
        this.like = like;
    }

    @Builder
    public CommentLikeRequest(UserCommentLikeId id, Comment comment, User user, String like) {
        this.id = id;
        this.comment = comment;
        this.user = user;
        this.like = like;
    }

    public CommentLikeRequest() {
    }
}
