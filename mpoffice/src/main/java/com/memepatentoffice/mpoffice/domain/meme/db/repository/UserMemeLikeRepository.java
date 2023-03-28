package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMemeLikeRepository extends JpaRepository<UserMemeLike,Long> {
    @Override
    <S extends UserMemeLike> S save(S entity);


    boolean existsUserMemeLikeByUserIdAndMemeId(Long userId, Long memeId);

    UserMemeLike findUserMemeLikeByUserIdAndMemeId(Long userId, Long memeId);
}
