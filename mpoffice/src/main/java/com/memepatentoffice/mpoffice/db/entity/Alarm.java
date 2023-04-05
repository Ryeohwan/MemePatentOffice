package com.memepatentoffice.mpoffice.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Alarm extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creater_id", nullable = false) // 알람 보내는 사람
    private User creater;

    @JoinColumn(name = "user_id") // 알람을 받는 사람
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meme_id", nullable = false)
    private Meme meme;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @JoinColumn(name = "auction_id")
    private Long auctionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private AlarmType type;
    @Column(name = "checked", nullable = false)
    private int checked;

    public void setChecked(int checked) {
        this.checked = checked;
    }
}
