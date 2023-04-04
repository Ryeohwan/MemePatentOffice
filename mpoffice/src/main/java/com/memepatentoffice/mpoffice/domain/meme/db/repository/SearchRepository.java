package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Search;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public interface SearchRepository extends JpaRepository<Search , Long> {
    Search findSearchByTitle(String title);

    Boolean existsByTitle(String title);
    int countAllByCreatedAtAndTitle(LocalDateTime createdAt, String title);
    int countAllByTitleAndCreatedAtBetween(String title, LocalDateTime from , LocalDateTime to);
    // 스케줄러 써서 10분에 한 번 하거나 !!!!
    @Query("SELECT s.title, count(*) as sc " +
            "FROM Search s " +
            "WHERE s.date BETWEEN :oneWeekAgo AND :time " + // 검색 기간 조건 추가
            "GROUP BY s.title " +
            "ORDER BY sc DESC ")
    List<Objects> findDailyRanking(@Param("time") LocalDateTime time, @Param("oneWeekAgo") LocalDateTime oneDayAgo);

    @Query("SELECT s.title, count(*) as sc " +
            "FROM Search s " +
            "WHERE s.date BETWEEN :oneWeekAgo AND :time " + // 검색 기간 조건 추가
            "GROUP BY s.title " +
            "ORDER BY sc DESC ")
    List<Search> findWeeklyRanking(@Param("time") LocalDateTime time, @Param("oneWeekAgo") LocalDateTime oneWeekAgo);

}
