package com.memepatentoffice.mpoffice.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserSignUpResponse {

    private final Long id;
    private final String name;

    private final String email;

    private final String nickname;

    private final String profileImage;

    private final String walletAddress;

    private final String isValid;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    @Builder
    public UserSignUpResponse(Long id, String name, String email, String nickname, String profileImage, String walletAddress, String isValid, LocalDateTime createdAt, LocalDateTime updatedAt) {
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
