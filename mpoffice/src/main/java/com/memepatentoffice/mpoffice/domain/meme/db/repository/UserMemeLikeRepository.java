package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.MemeLike;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserMemeLikeRepository extends JpaRepository<UserMemeLike,Long> {
    @Override
    <S extends UserMemeLike> S save(S entity);
    boolean existsUserMemeLikeByUserIdAndMemeId(Long userId, Long memeId);
    UserMemeLike findUserMemeLikeByUserIdAndMemeId(Long userId, Long memeId);
    int countUserMemeLikesByUserId(Long userId);

    // 특정 유저가 특정 밈을 좋아요나 싫어요를 했는지
    @Query("SELECT COUNT(m) FROM UserMemeLike m WHERE m.user.id = :userId AND m.meme.id = :memeId AND m.memeLike = :meme_like")
    int countLike(@Param("userId") Long userId, @Param("memeId") Long memeId, @Param("meme_like") MemeLike memeLike);


//    해당 밈의 좋아요 총 수 , 해당 밈의 싫어요 총 수
    @Query("select count(m) from  UserMemeLike m where m.meme.id = :memeId AND m.memeLike = :meme_like")
    int countLikeOrHate(@Param("memeId") Long memeId, @Param("meme_like") MemeLike memeLike);

}
