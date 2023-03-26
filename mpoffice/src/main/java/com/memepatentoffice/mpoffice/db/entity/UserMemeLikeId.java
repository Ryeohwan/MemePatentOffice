package com.memepatentoffice.mpoffice.db.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class UserMemeLikeId implements Serializable {
    private static final long serialVersionUID = -3722267237384398894L;
    @NonNull
    private Long meme;
    @NonNull
    private Long user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserMemeLikeId entity = (UserMemeLikeId) o;
        return Objects.equals(this.meme, entity.meme) &&
                Objects.equals(this.user, entity.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meme, user);
    }


}


