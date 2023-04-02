package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.CommentLike;
import com.memepatentoffice.mpoffice.db.entity.UserCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import static com.memepatentoffice.mpoffice.db.entity.CommentLike.LIKE;

public interface UserCommentLikeRepository extends JpaRepository<UserCommentLike, Long> {
    @Override
    <S extends UserCommentLike> S save(S entity);
    Boolean existsByUserIdAndCommentId(Long userId, Long commentId);
    List<UserCommentLike> findAllByCommentIdAndUserId(Long userId, Long commentId);

//    @Query("SELECT u.comment FROM UserCommentLike u WHERE u.comment.id = :commentId GROUP BY u.comment ORDER BY COUNT(u) DESC LIMIT 3")
//    List<Comment> countCommentLikes(@Param("commentId") Long commentId);


}
