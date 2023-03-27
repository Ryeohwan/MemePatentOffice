package com.memepatentoffice.mpoffice.db.entity;

import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

public class UserCommentLikeId implements Serializable {
    private static final long serialVersionUID = 5704860724562823574L;

    private Long comment;

    private Long user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserCommentLikeId entity = (UserCommentLikeId) o;
        return Objects.equals(this.comment, entity.comment) &&
                Objects.equals(this.user, entity.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comment, user);
    }

}