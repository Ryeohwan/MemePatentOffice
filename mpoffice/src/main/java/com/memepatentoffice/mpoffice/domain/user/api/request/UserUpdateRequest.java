package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserUpdateRequest {
    private final Long id;

    private final String nickname;

    private final String profileImage;


    @Builder
    public UserUpdateRequest(Long id, String nickname, String profileImage) {
        this.id = id;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
