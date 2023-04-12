package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MemeListResponse {
    private Long id;
    private String nickname;
    private String title;
    private String imgUrl;
    private String description;
    private String example;
    private String userImg;
}
