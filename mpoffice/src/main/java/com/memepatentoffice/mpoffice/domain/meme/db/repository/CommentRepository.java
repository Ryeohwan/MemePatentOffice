package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Override
    <S extends Comment> S save(S entity);
    Comment findCommentById(Long id);
    List<Comment> findCommentsByUserId (Long id);

    Slice<Comment> findCommentsByCreatedAt (LocalDateTime time);
}
