package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmService {

    private final AlarmRepository alarmRepository;
    private final AlarmCustomRepository alarmCustomRepository;
    private final UserRepository userRepository;
    private final MemeRepository memeRepository;
    private final CommentRepository commentRepository;
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
    public void addAuctionAlarm(Long auctionId, Long userId, Long memeId, AlarmType type) throws NotFoundException {

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

    @Transactional
    public void addCommentAlarm(Long commentId, Long memeId) throws NotFoundException {
        Meme meme = memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme"));
        User user = meme.getOwner();
        // 밈의 주인에게 알람을 등록한다
        Alarm alarm = Alarm
                .builder()
                .comment(commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(commentId + " : Comment")))
                .user(user)
                .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                .type(AlarmType.COMMENT).build();

        alarmRepository.save(alarm);
    }

    @Transactional
    public void addReplyAlarm(Long commentId, Long userId, Long memeId, Long parentId) throws NotFoundException {
        // 댓글의 주인에게 알림을 등록한다
        // REPLY 일때 auctionId에 parent comment 의 id 값이 들어가 있다.
        Alarm alarm = Alarm
                .builder()
                .comment(commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(commentId + " : Comment")))
                .user(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User")))
                .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                .auctionId(parentId)
                .type(AlarmType.REPLY).build();

        alarmRepository.save(alarm);
    }
}
