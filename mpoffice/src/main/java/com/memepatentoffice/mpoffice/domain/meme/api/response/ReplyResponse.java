package com.memepatentoffice.mpoffice.domain.meme.api.response;

import com.memepatentoffice.mpoffice.db.entity.MemeLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyResponse {
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
