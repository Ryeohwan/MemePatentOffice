package com.memepatentoffice.auction.api.dto.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.ToString;

@AllArgsConstructor
@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY) //혹은 제이슨으로 변환할 필드에 @JsonProperty, 제이슨으로 변환하지 않을 필드에 @JsonIgnore을 준다.
@ToString
public class AuctionClosing {
    private Long memeId;
    private Long buyerId;
    private Long sellerId;
    private String createdAt;
    private Long price;
}
