package com.memepatentoffice.mpoffice.domain.meme.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentnewRequest {
    private Long userId;
    private Long memeId;
    private String content;
    private LocalDateTime createdAt;
}
