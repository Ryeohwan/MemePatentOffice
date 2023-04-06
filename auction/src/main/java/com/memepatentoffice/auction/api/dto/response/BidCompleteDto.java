package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class BidCompleteDto {
    public Long memeId;
    public Long userId;
    public Long hammerPrice;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    public LocalDateTime soldDate;

}
