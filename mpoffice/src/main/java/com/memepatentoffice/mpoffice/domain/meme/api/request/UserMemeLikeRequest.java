package com.memepatentoffice.mpoffice.domain.meme.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserMemeLikeRequest {
    private Long memeId;
    private Long userId;

}
