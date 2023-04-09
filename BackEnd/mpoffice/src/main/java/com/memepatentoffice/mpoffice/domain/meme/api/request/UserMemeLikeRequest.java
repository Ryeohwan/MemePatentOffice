package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.MemeLike;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserMemeLikeRequest {
    private Long memeId;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private MemeLike memeLike;
    private LocalDateTime date;

}
