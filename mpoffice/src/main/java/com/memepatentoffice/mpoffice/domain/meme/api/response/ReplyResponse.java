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
    private String nickName;
    private String profileImage;
    private String content;
    private String createdAt;
    private Long originId;
    private String originNickName;
}
