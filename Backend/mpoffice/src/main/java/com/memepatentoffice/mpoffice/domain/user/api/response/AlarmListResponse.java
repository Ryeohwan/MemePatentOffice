package com.memepatentoffice.mpoffice.domain.user.api.response;

import com.memepatentoffice.mpoffice.db.entity.AlarmType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@AllArgsConstructor
@Builder
public class AlarmListResponse {
    private Long alarmId;
    private Long memeId;
    private Long commentId;
    private Long auctionId;
    @Enumerated(EnumType.STRING)
    private AlarmType type;
    private String nickname;
    private String profileSrc;
    private String title;
    private String memeSrc;
    private String date;

}
