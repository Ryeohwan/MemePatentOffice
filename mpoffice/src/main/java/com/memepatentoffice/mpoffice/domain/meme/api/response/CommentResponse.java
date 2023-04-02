package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private Long userId;
    private String nickname;
    private String profileImage;
    private String content;
    private String date;
    private int heartCnt;
    private int best;
    private int replyCommentCnt;
    private Boolean liked;
    private Long parentId;
    private String parentName;

}
