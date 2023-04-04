package com.memepatentoffice.auction.api.dto.message;

import com.memepatentoffice.auction.api.dto.status.CharacterStatus;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WebSocketCharacter {
    private Long auctionId;
    private String nickname;
    private Double x,y,z, rotation_x,rotation_y,rotation_z;
    private CharacterStatus status;
}
