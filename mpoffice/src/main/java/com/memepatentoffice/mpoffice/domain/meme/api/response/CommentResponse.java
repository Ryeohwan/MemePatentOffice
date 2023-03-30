package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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
    private LocalDateTime createdAt;
}
