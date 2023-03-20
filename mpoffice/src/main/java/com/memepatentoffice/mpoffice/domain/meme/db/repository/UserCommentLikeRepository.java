package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.UserCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCommentLikeRepository extends JpaRepository<UserCommentLike, Long> {
    @Override
    <S extends UserCommentLike> S save(S entity);
}
