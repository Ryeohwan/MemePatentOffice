package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemeResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime localDateTime;


}
