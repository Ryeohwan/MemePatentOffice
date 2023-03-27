package com.memepatentoffice.mpoffice.db.entity;

import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

public class UserMemeLikeId implements Serializable {
    private Long meme;
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


