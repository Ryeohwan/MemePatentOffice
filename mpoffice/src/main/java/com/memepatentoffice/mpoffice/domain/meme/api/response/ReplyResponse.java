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
    private String userName;
    private String userImgUrl;
    private String comment;
    private String date;
    private Long parentId;
    private String parentName;
}
