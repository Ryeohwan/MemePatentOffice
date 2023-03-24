package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserMemeLikeId implements Serializable {
    private static final long serialVersionUID = -3722267237384398894L;
    @Column(name = "meme_id", nullable = false)
    private Integer memeId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserMemeLikeId entity = (UserMemeLikeId) o;
        return Objects.equals(this.memeId, entity.memeId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memeId, userId);
    }

}