package com.memepatentoffice.mpoffice.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
public class CommentResponse {

    private Long id;

    private Long userId;

    private Long memeId;

    private Long parentCommentSeq;

    private String content;

    private String isValid;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMemeId(Long memeId) {
        this.memeId = memeId;
    }

    public void setParentCommentSeq(Long parentCommentSeq) {
        this.parentCommentSeq = parentCommentSeq;
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
    public CommentResponse(Long id, Long userId, Long memeId, Long parentCommentSeq, String content, String isValid, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.memeId = memeId;
        this.parentCommentSeq = parentCommentSeq;
        this.content = content;
        this.isValid = isValid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public CommentResponse() {
    }
}
