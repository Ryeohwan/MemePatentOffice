package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MyHistoryList {
    private Long id;
    private String title;
    private String seller;
    private Double price;
    private String imgSrc;
    private String date;
}
