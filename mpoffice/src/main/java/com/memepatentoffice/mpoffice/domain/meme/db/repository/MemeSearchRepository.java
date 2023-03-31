package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeListResponse;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static com.memepatentoffice.mpoffice.db.entity.QMeme.meme;
import static com.memepatentoffice.mpoffice.db.entity.QTransaction.transaction;
import static com.memepatentoffice.mpoffice.db.entity.QUser.user;
import static com.memepatentoffice.mpoffice.db.entity.QUserMemeLike.userMemeLike;
import static com.querydsl.core.types.ExpressionUtils.count;

@Repository
@Slf4j
public class MemeSearchRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public MemeSearchRepository(EntityManager em)
    {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    // default - 날짜 최신 순
    public Slice<MemeListResponse> searchMemeList(Long lastMemeId, String word, Pageable pageable) {

        List<MemeListResponse> results = queryFactory.select(
                Projections.constructor( MemeListResponse.class,
                        meme.id,
                        user.nickname,
                        meme.title,
                        meme.imageurl.as("imgUrl"),
                        meme.content.as("description"),
                        meme.situation.as("example")))
                .from(meme)
                .innerJoin(user).fetchJoin()
                .on(meme.owner.id.eq(user.id))
                .where(
                        // no-offset 페이징 처리
                        ltMemeId(lastMemeId),
                        containMemeTitle(word)
                )
                .orderBy(meme.createdAt.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        // 무한 스크롤 처리
        return checkLastPage(pageable, results);
    }


    // 인기순 전체 검색
    public Slice<MemeListResponse> searchPopularMemeList(String days, Long lastMemeId, String word, Pageable pageable) {

        List<MemeListResponse> results = queryFactory.select(
                        Projections.constructor( MemeListResponse.class,
                                meme.id,
                                user.nickname,
                                meme.title,
                                meme.imageurl.as("imgUrl"),
                                meme.content.as("description"),
                                meme.situation.as("example")))
                .from(meme)

                .innerJoin(user).fetchJoin()
                .on(meme.owner.id.eq(user.id))

                .leftJoin(userMemeLike)
                .on(meme.id.eq(userMemeLike.meme.id))

                .where(
                        // no-offset 페이징 처리

                        ltMemeId(lastMemeId),
                        containMemeTitle(word),
                        daysMeme(days)


                )
                .groupBy(meme.id)
                .orderBy(meme.id.count().desc())

                .limit(pageable.getPageSize()+1)
                .fetch();

        // 무한 스크롤 처리
        return checkLastPage(pageable, results);
    }

    public Slice<MemeListResponse> searchExpensiveMemeList(String days, Long lastMemeId, String word, Pageable pageable) {

        List<MemeListResponse> results = queryFactory.select(
                        Projections.constructor( MemeListResponse.class,
                                meme.id,
                                user.nickname,
                                meme.title,
                                meme.imageurl.as("imgUrl"),
                                meme.content.as("description"),
                                meme.situation.as("example")))
                .from(meme)

                .innerJoin(user).fetchJoin()
                .on(meme.owner.id.eq(user.id))
                .leftJoin(transaction)
                .on(meme.id.eq(transaction.memeId))

                .where(
                        // no-offset 페이징 처리

                        ltMemeId(lastMemeId),
                        containMemeTitle(word),
                        daysMeme(days)
                )
                .groupBy(meme.id)
                .orderBy(transaction.price.max().desc())

                .limit(pageable.getPageSize()+1)
                .fetch();

        // 무한 스크롤 처리
        return checkLastPage(pageable, results);
    }

    public Slice<MemeListResponse> searchViewsMemeList(String days, Long lastMemeId, String word, Pageable pageable) {

        List<MemeListResponse> results = queryFactory.select(
                        Projections.constructor( MemeListResponse.class,
                                meme.id,
                                user.nickname,
                                meme.title,
                                meme.imageurl.as("imgUrl"),
                                meme.content.as("description"),
                                meme.situation.as("example")))
                .from(meme)

                .innerJoin(user).fetchJoin()
                .on(meme.owner.id.eq(user.id))

                .where(
                        // no-offset 페이징 처리
                        ltMemeId(lastMemeId),
                        containMemeTitle(word),
                        daysMeme(days)
                )

                .orderBy(meme.searched.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        // 무한 스크롤 처리
        return checkLastPage(pageable, results);

    }



    private BooleanExpression ltMemeId(Long memeId) {
        if (memeId == 0) {
            return meme.id.lt(Long.MAX_VALUE);
        }
        return meme.id.lt(memeId);
    }
    private BooleanExpression containMemeTitle(String word) {
        if(word == null) {
            return null;
        }
        return meme.title.contains(word);
    }

    private BooleanExpression daysMeme(String days) {

        if (days.equals("all")) {
            return null;
        } else if(days.equals("today")) {
            return meme.createdAt.eq(LocalDateTime.now());
        } else if(days.equals("week")) {
            return meme.createdAt.after(LocalDateTime.now().minusWeeks(1));
        }
        return null;
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<MemeListResponse> checkLastPage(Pageable pageable, List<MemeListResponse> results) {

        boolean hasNext = false;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }


}
