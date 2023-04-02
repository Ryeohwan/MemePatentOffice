package com.memepatentoffice.mpoffice.db.entity;

import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User extends BaseEntity{

    @Column(name = "name", length = 20)
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @Column(name = "email")
    private String email;

    @Column(name = "nickname", length = 20)
    private String nickname;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_valid", nullable = false)
    private IsValid isValid;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "withdrawal_reason")
    private String withdrawalReason;

    @Column(name = "today_meme_count")
    private int todayMemeCount;

    @Column(name = "today")
    private LocalDateTime today;
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setTodayMemeLike(int todayMemeCount) {
        this.todayMemeCount = todayMemeCount;
    }

    public void setToday(LocalDateTime today) {
        this.today = today;
    }

    public void setWithdrawalReason(String withdrawalReason) {
        this.withdrawalReason = withdrawalReason;
    }

    public void setIsValid(IsValid isValid) {
        this.isValid = isValid;
    }
}