package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Alarm;
import com.memepatentoffice.mpoffice.db.entity.AlarmType;
import com.memepatentoffice.mpoffice.db.entity.UserMemeAuctionAlert;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeAuctionAlertRepository;
import com.memepatentoffice.mpoffice.domain.user.api.response.AlarmCheckResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.AlarmListResponse;
import com.memepatentoffice.mpoffice.domain.user.db.repository.AlarmCustomRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.AlarmRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmService {

    private final AlarmRepository alarmRepository;
    private final AlarmCustomRepository alarmCustomRepository;
    private final UserRepository userRepository;
    private final MemeRepository memeRepository;

    private final UserMemeAuctionAlertRepository userMemeAuctionAlertRepository;

    @Transactional
    public Slice<AlarmListResponse> getAlarms(Long lastId, Long userId, Pageable pageable) throws NotFoundException {
        Slice<AlarmListResponse> alarmList = alarmCustomRepository.getAlarmList(lastId, userId, pageable);

        for (AlarmListResponse alarmListResponse : alarmList) {
            Long alarmId = alarmListResponse.getAlarmId();
            Alarm alarm = alarmRepository.findById(alarmId).orElseThrow(() -> new NotFoundException(alarmId + " : Alarm"));
            alarm.setChecked(1); // 읽음으로 처리
        }
        return alarmList;
    }

    public AlarmCheckResponse checkAlarmExist(Long userId) {
        long count = alarmRepository.countByCheckedAndUserId(0, userId);
        Boolean result = (count == 0)? false: true;
        return AlarmCheckResponse.builder().isExist(result).build();
    }

    @Transactional
    public void addAlarm(Long auctionId, Long userId, Long memeId, AlarmType type) throws NotFoundException {

        List<UserMemeAuctionAlert> list = userMemeAuctionAlertRepository.findAllByMemeId(memeId);

        for(UserMemeAuctionAlert a : list) {
            Long id = a.getUser().getId();
            Alarm alarm = Alarm
                    .builder()
                    .auctionId(auctionId)
                    .user(userRepository.findById(id).orElseThrow(() -> new NotFoundException(userId + " : User")))
                    .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                    .type(type).build();

            alarmRepository.save(alarm);
        }

    }
}
