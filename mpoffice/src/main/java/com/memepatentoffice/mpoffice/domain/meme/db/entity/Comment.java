package com.memepatentoffice.mpoffice.domain.meme.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
@Entity
public class Comment {
    @Id
    @Column(name = "comment_id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @Column(name = "parent_comment_seq")
    private Long parentCommentSeq;

    @Column(name = "content")
    private String content;

    @Lob
    @Column(name = "isValid")
    private String isValid;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}