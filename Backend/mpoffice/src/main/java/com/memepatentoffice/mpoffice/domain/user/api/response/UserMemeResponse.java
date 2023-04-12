package com.memepatentoffice.mpoffice.domain.user.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserMemeResponse {
    private Long id;
    private String nickname;
    private String title;
    private String imgUrl;
    private String description;
    private String example;
    private String userImg;
}
