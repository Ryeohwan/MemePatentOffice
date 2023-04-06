package com.memepatentoffice.auction.api.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuctionCreationReq {
    private Long memeId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime startDateTime;
    private Long sellerId;
    private Long startingPrice;

}
