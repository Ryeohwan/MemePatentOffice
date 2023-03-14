package com.memepatentoffice.mpoffice.domain.meme.db.entity;

import lombok.Getter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserMemeLikeId implements Serializable {
    private static final long serialVersionUID = -3888702994186248463L;
    @Column(name = "meme_seq", nullable = false)
    private Long memeSeq;

    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserMemeLikeId entity = (UserMemeLikeId) o;
        return Objects.equals(this.memeSeq, entity.memeSeq) &&
                Objects.equals(this.userSeq, entity.userSeq);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memeSeq, userSeq);
    }

}