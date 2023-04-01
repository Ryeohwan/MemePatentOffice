package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.IsValid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequest {
    private Long userId;
    private Long memeId;
    @Nullable
    private Long parentComment;
    private String content;
    private Boolean liked;
    private int likes;
    private LocalDateTime createdAt;
}
