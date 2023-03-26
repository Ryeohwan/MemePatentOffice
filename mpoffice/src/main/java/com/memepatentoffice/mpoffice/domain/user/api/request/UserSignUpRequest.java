package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;
import com.memepatentoffice.mpoffice.db.entity.isValid;

import java.time.LocalDateTime;

@Getter
public class UserSignUpRequest {
    private final Long id;
    private final String name;

    private final String email;

    private final String nickname;

    private final String profileImage;

    private final String walletAddress;

    private final isValid isValid;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    @Builder
    public UserSignUpRequest(Long id, String name, String email, String nickname, String profileImage, String walletAddress, isValid isValid, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.walletAddress = walletAddress;
        this.isValid = isValid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
