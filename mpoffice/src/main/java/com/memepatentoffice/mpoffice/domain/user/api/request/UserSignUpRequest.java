package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;
import com.memepatentoffice.mpoffice.db.entity.IsValid;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
public class UserSignUpRequest {
    private final String name;
    private final String email;
    private final String nickname;
    private final String profileImage;
    private final String walletAddress;
    @Enumerated(EnumType.STRING)
    private final IsValid isValid;
    private final LocalDateTime createdAt;

    @Builder
    public UserSignUpRequest(String name, String email, String nickname, String profileImage, String walletAddress, IsValid isValid, LocalDateTime createdAt ) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.walletAddress = walletAddress;
        this.isValid = isValid;
        this.createdAt = createdAt;
    }
}
