package com.memepatentoffice.mpoffice.domain.user.api.dto;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Getter
public class CommentDto {

    private Long id;

    private Long userId;

    private Long parentCommentSeq;

    private String content;

    private String isValid;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Builder
    public CommentDto(Long id, Long userId, Long parentCommentSeq, String content, String isValid, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.parentCommentSeq = parentCommentSeq;
        this.content = content;
        this.isValid = isValid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
