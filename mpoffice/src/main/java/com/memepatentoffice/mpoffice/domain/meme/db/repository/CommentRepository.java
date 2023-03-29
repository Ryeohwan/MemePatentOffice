package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Override
    <S extends Comment> S save(S entity);
    @Query("SELECT e FROM Comment e JOIN UserCommentLike e2 " +
            "where e.id = e2.comment.id ORDER BY e.createdAt ASC")
    List<Comment> findCommentsByMemeId(Long id);
    Optional<Comment> findCommentById(Long id);
    List<Comment> findCommentsByUserId (Long id);
    Slice<Comment> findCommentsByCreatedAt (LocalDateTime time);
}
