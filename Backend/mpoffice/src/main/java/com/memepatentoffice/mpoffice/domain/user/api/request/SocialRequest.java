package com.memepatentoffice.mpoffice.domain.user.api.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SocialRequest {
    private String nickname;
    private String email;

}
