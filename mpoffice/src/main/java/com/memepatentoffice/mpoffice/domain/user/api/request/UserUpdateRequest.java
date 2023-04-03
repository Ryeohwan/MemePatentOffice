package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;

@Getter
@NoArgsConstructor
public class UserUpdateRequest {
    private Long id;
    @Nullable
    private String nickname;
    @Nullable
    private String userImage;
    @Builder
    public UserUpdateRequest(Long id, String nickname, String userImage) {
        this.id = id;
        this.nickname = nickname;
        this.userImage = userImage;
    }

    public void setUserImage(String userImage){
        this.userImage = userImage;
    }
}
