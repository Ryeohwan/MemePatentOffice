package com.memepatentoffice.mpoffice.domain.user.db.entity;

import lombok.Getter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserMemeAuctionAlertId implements Serializable {
    private static final long serialVersionUID = 1752256327792781124L;
    @Column(name = "meme_seq", nullable = false)
    private Long memeSeq;

    @Column(name = "user_seq", nullable = false)
    private Long userSeq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserMemeAuctionAlertId entity = (UserMemeAuctionAlertId) o;
        return Objects.equals(this.memeSeq, entity.memeSeq) &&
                Objects.equals(this.userSeq, entity.userSeq);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memeSeq, userSeq);
    }

}