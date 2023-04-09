package com.memepatentoffice.mpoffice.domain.user.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class CountResponse {
    private int count;
    private LocalDateTime today;


}
