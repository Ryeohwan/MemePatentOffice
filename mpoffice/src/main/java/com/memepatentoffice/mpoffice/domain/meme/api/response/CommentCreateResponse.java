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
    private Long commentId;
    private Long createrId;
    private String userProfile;
    private String nickName;
    private String content;
    private int likeCount;
    private String createdAt;
    private Boolean liked;
    private int replyCount;
    private Boolean isBest;
}
