package com.memepatentoffice.auction.api.dto.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketChatRes {
    private Long auctionId;
    private String nickname;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;

}
