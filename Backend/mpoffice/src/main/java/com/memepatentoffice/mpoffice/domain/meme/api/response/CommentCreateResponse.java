package com.memepatentoffice.mpoffice.domain.meme.api.response;

import com.memepatentoffice.mpoffice.db.entity.MemeLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CommentCreateResponse {
    private Long Id;
    private Long userId;
    private String userImgUrl;
    private String userName;
    private String comment;
    private int likes;
    private String date;
    private Boolean liked;
    private int replyCommentCnt;
    private int best;
}
