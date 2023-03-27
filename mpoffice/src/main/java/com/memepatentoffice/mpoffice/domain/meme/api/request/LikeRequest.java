package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLikeId;
import com.memepatentoffice.mpoffice.db.entity.like;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@RequiredArgsConstructor
public class LikeRequest {
    private final MemeRepository memeRepository;
    private final UserRepository userRepository;

    private Long meme;

    private Long user;
    @Enumerated(EnumType.STRING)
    private like like;

    public UserMemeLike toEntity() throws NotFoundException {
        return UserMemeLike.builder()
                .user(userRepository.findUserById(meme))
                .meme(memeRepository.findMemeById(user))
                .like(like)
                .build();
    }

    public void setMeme(Long meme) {
        this.meme = meme;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public void setLike(com.memepatentoffice.mpoffice.db.entity.like like) {
        this.like = like;
    }
}
