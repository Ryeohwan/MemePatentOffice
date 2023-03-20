package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<UserMemeLike,Long> {
    @Override
    <S extends UserMemeLike> S save(S entity);
}
