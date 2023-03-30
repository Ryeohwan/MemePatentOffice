package com.memepatentoffice.mpoffice.domain.meme.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class MemeInfoRequest {
    private Long userId;
    private String title;
}
