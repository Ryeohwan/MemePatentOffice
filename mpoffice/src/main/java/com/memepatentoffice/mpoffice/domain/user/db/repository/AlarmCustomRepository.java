package com.memepatentoffice.mpoffice.domain.user.db.repository;


import com.memepatentoffice.mpoffice.domain.user.api.response.AlarmListResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;


import org.springframework.data.domain.SliceImpl;

import javax.persistence.EntityManager;
import java.util.List;

import static com.memepatentoffice.mpoffice.db.entity.QAlarm.alarm;
import static com.memepatentoffice.mpoffice.db.entity.QMeme.meme;
import static com.memepatentoffice.mpoffice.db.entity.QUser.user;


@Repository
@Slf4j
public class AlarmCustomRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public AlarmCustomRepository(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    public Slice<AlarmListResponse> getAlarmList(Long lastAlarmId, Long userId, Pageable pageable) {
        List<AlarmListResponse> results = queryFactory.select(
                Projections.constructor(AlarmListResponse.class,
                        alarm.id.as("alarmId"),
                        alarm.meme.id.as("memeId"),
                        alarm.comment.id.as("commentId"),
                        alarm.auctionId.as("auctionId"),
                        alarm.type,
                        user.nickname,
                        user.profileImage.as("profileSrc"),
                        meme.imageurl.as("memeSrc"),
                        alarm.createdAt.as("date"))
                )
                .from(alarm)

                .where(user.id.eq(userId))

                .innerJoin(user).fetchJoin()
                .on(alarm.user.id.eq(user.id))

                .innerJoin(meme).fetchJoin()
                .on(alarm.meme.id.eq(meme.id))

                .orderBy(alarm.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        // 무한 스크롤 처리
        return checkLastPage(pageable, results);
    }

    private Slice<AlarmListResponse> checkLastPage(Pageable pageable, List<AlarmListResponse> results) {

        boolean hasNext = false;
        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }
}
