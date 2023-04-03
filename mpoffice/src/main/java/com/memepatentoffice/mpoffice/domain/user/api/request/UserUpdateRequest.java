package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.Nullable;

@Getter
@NoArgsConstructor
public class UserUpdateRequest {
    private Long id;

    @Nullable
    private String nickname;
    @Nullable
    private String profileImage;


    @Builder
    public UserUpdateRequest(Long id, String nickname, String profileImage) {
        this.id = id;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
