package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Builder;
import lombok.Getter;
import com.memepatentoffice.mpoffice.db.entity.IsValid;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
    private String name;
    private String email;
    private String nickname;
    private String profileImage;

    @Builder
    public UserSignUpRequest(String name, String email, String nickname, String profileImage) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }


}
