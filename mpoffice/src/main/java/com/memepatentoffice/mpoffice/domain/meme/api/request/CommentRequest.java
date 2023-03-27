package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.IsValid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    private Long id;

    private Long userId;

    private Long memeId;

    private Long parentCommentSeq;

    private String content;

    private IsValid isValid;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
