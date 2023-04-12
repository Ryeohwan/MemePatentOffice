package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyCommentList {
    private Long id;
    private Long memeId;
    private String memeImage;
    private String memeTitle;
    private String content;
    private String date;
    private Long parentId;

    public void setParentId(Long parentId){
        this.parentId = parentId;
    }
}
