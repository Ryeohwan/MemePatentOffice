package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemeResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Long ownerId;
    private Long createrId;

}
