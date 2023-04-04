package com.memepatentoffice.mpoffice.domain.user.api.response;

import com.memepatentoffice.mpoffice.db.entity.AlarmType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

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
    private String nikcname;
    private String profileSrc;
    private String memeSrc;
    private LocalDateTime date;

}
