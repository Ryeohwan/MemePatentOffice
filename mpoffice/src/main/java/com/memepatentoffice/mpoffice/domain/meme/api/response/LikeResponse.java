package com.memepatentoffice.mpoffice.domain.meme.api.response;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLikeId;
import com.memepatentoffice.mpoffice.db.entity.like;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
public class LikeResponse {
    private Meme meme;
    private User user;
    private UserMemeLikeId id;

    @Enumerated(EnumType.STRING)
    private like like;

    @Builder
    public LikeResponse(Meme meme, User user, UserMemeLikeId id, like like) {
        this.meme = meme;
        this.user = user;
        this.id = id;
        this.like = like;
    }

    public LikeResponse() {
    }
}
