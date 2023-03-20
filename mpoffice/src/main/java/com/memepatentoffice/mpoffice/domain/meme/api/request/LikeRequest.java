package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLikeId;
import lombok.Getter;

@Getter
public class LikeRequest {
    private Meme meme;
    private User user;

    private UserMemeLikeId id;

    public UserMemeLike toEntity(){
        return UserMemeLike.builder()
                .id(id)
                .userSeq(user)
                .memeSeq(meme)
                .build();
    }

}
