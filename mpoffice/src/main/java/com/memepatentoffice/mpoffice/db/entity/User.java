package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "nickname", length = 20)
    private String nickname;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Lob
    @Column(name = "is_valid", nullable = false)
    private isValid isValid;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "withdrawal_reason")
    private String withdrawalReason;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public void setIsValid(isValid isValid) {
        this.isValid = isValid;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setWithdrawalReason(String withdrawalReason) {
        this.withdrawalReason = withdrawalReason;
    }

    @Builder
    public User(Long id, String name, String email, String nickname, String profileImage, String walletAddress, isValid isValid, LocalDateTime createdAt, LocalDateTime updatedAt, String withdrawalReason) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.walletAddress = walletAddress;
        this.isValid = isValid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.withdrawalReason = withdrawalReason;
    }

    public User() {
    }
}