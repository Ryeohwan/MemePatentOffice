package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
@Builder
public class CommentResponse {
    private String profileImage;
    private String nickname;
    private Boolean liked;
    private int heartCnt;
    private String content;
    private int replyCommentCnt;
    private Long id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime createdAt;
}
