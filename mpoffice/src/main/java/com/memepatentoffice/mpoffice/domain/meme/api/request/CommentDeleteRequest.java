package com.memepatentoffice.mpoffice.domain.meme.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDeleteRequest {
    private Long userId;
    private Long memeId;
    private Long commentId;
}
