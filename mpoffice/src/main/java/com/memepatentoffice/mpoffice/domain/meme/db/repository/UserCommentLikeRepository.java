package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.UserCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCommentLikeRepository extends JpaRepository<UserCommentLike, Long> {
    @Override
    <S extends UserCommentLike> S save(S entity);
    Boolean existsByUseIdAndCommentId(Long userId, Long commentId);

//    @Query("SELECT u.comment FROM UserCommentLike u WHERE u.comment.id = :commentId GROUP BY u.comment ORDER BY COUNT(u) DESC LIMIT 3")
//    List<Comment> countCommentLikes(@Param("commentId") Long commentId);
    Integer countUserCommentLikesByCommentId(Long commentId);


}
