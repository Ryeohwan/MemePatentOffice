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

import java.time.LocalDateTime;
import java.util.List;

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
        // 경매를 찐한 사용자의 리스트를 가져온다
        List<UserMemeAuctionAlert> list = userMemeAuctionAlertRepository.findAllByMemeId(memeId);

        // 경매를 등록한 사람에게 알람을 등록한다
        Alarm alarm = Alarm
                .builder()
                .auctionId(auctionId)
                .userId(userId)// 알람을 받는 사람과 발생 시킨 사람이 모두 같다
                .creater(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User")))
                .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                .createdAt(LocalDateTime.now())
                .type(type).build();
        alarmRepository.save(alarm);

        for(UserMemeAuctionAlert a : list) {
            Long id = a.getUser().getId();
            alarm = Alarm
                    .builder()
                    .auctionId(auctionId)
                    .userId(id) // 알람을 받는 사람
                    .creater(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User")))
                    .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                    .createdAt(LocalDateTime.now())
                    .type(type).build();

            alarmRepository.save(alarm);
        }
    }

    @Transactional
    // 누가댓글을 썻는지 userId
    // 누구에게 알림을 보내는지 ( 밈의 주인 )
    // 무슨 밈에 썼는지
    // 무슨 댓글인지
    public void addCommentAlarm(Long commentId, Long memeId, Long userId) throws NotFoundException {
        Meme meme = memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme"));
        User user = meme.getOwner();
        // 밈의 주인에게 알람을 등록한다
        Alarm alarm = Alarm
                .builder()
                .comment(commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(commentId + " : Comment")))
                .creater(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User")))// 댓글 작성자
                .userId(user.getId()) // 밈의 주인에게 알람을 보낸다
                .meme(meme)
                .createdAt(LocalDateTime.now())
                .type(AlarmType.COMMENT).build();

        alarmRepository.save(alarm);
    }

    @Transactional
    public void addReplyAlarm(Long commentId, Long userId, Long memeId, Long parentId) throws NotFoundException {
        // 댓글의 주인에게 알림을 등록한다
        // REPLY 일때 auctionId에 parent comment 의 id 값이 들어가 있다.
        // 대댓글 아이디, 대댓글을 단 사람, 대댓글을 단 밈, 대댓글의 부모 댓글 아이디
        Comment parentComment = commentRepository.findById(parentId).orElseThrow(() -> new NotFoundException(commentId + ":Comment"));
        Alarm alarm = Alarm
                .builder()
                .comment(commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(commentId + ":Comment")))
                .creater(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User")))
                .userId(parentComment.getUser().getId()) // Comment의 주인에게 알림을 보낸다
                .meme(memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException(memeId + " : Meme")))
                .auctionId(parentId)
                .createdAt(LocalDateTime.now())
                .type(AlarmType.REPLY).build();

        alarmRepository.save(alarm);
    }

    public String getWalletAddressByUserId(Long toId) throws NotFoundException {
        User user = userRepository.findById(toId).orElseThrow(() -> new NotFoundException(toId + " : User"));
        return user.getWalletAddress();
    }
}
