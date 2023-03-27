package com.memepatentoffice.mpoffice.domain.user.api.response;

import com.memepatentoffice.mpoffice.db.entity.User;
import lombok.Getter;
import com.memepatentoffice.mpoffice.db.entity.IsValid;

import java.time.LocalDateTime;

@Getter
public class UserResponse {

    private final Long id;
    private final String name;

    private final String email;

    private final String nickname;

    private final String profileImage;

    private final String walletAddress;

    private final IsValid isValid;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();
        this.walletAddress = user.getWalletAddress();
        this.isValid = user.getIsValid();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
