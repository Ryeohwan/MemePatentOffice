package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Search;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SearchRepository extends JpaRepository<Search , Long> {
    Search findSearchByTitle(String title);

    Boolean existsByTitle(String title);
    int countAllByCreatedAtAndTitle(LocalDateTime createdAt, String title);
    int countAllByTitleAndCreatedAtBetween(String title, LocalDateTime from , LocalDateTime to);

    List<Search> findAll();

    @Query("SELECT s.title , count(c) as sc " +
            "from Search s " +
            " left join Search c on s.title = c.title " +
            " order by sc desc ")
    List<Search> findDailyRanking(@Param("time")LocalDateTime time);
}
