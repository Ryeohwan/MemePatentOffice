package com.memepatentoffice.mpoffice.domain.meme.api.response;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLikeId;
import lombok.Getter;

@Getter
public class LikeResponse {
    private Meme meme;
    private User user;
    private UserMemeLikeId id;

    public void setMeme(Meme meme) {
        this.meme = meme;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(UserMemeLikeId id) {
        this.id = id;
    }
}
