package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import lombok.Getter;

@Getter
public class LikeRequest {
    private Long memeId;
    private Long userId;

    private Long id;

    public UserMemeLike toEntity(){
        return UserMemeLike.builder()
                .id(id)
                .userSeq(userId)
                .memeSeq(memeId)
                .build()

}
