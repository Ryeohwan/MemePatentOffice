package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Override
    <S extends Comment> S save(S entity);
    Comment findCommentById(Long id);
    Page<Comment> findCommentsByUserId (PageRequest pageRequest);
}
