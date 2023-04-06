package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.memepatentoffice.auction.api.dto.status.MemeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@ToString
public class MemeRes {
    @JsonFormat
    MemeStatus memeStatus;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm")
    LocalDateTime startTime;
}
