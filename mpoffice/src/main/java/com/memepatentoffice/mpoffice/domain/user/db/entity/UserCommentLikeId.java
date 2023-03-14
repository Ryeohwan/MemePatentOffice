package com.memepatentoffice.mpoffice.domain.user.db.entity;

import lombok.Getter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserCommentLikeId implements Serializable {
    private static final long serialVersionUID = 5704860724562823574L;
    @Column(name = "comment_id", nullable = false)
    private Long commentId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserCommentLikeId entity = (UserCommentLikeId) o;
        return Objects.equals(this.commentId, entity.commentId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, userId);
    }

}