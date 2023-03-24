package com.memepatentoffice.mpoffice.db.entity;

import lombok.Builder;
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

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "meme_id", nullable = false)
    private Long memeId;

    @Column(name = "parent_comment_id")
    private Long parentCommentId;

    @Column(name = "content")
    private String content;

    @Lob
    @Column(name = "isValid")
    private String isValid;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long UserId) {
        this.userId = userId;
    }

    public void setMemeId(Long memeId) {
        this.memeId = memeId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Builder
    public Comment(Long id, Long userId, Long memeId, Long parentCommentId, String content, String isValid, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.memeId = memeId;
        this.parentCommentId = parentCommentId;
        this.content = content;
        this.isValid = isValid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Comment() {
    }
}