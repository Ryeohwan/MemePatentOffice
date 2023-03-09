package com.memepatentoffice.mpoffice.db.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserCommentLikeId implements Serializable {
    private Long user;
    private Long comment;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCommentLikeId that = (UserCommentLikeId) o;
        return Objects.equals(user, that.user) && Objects.equals(comment, that.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, comment);
    }

}
