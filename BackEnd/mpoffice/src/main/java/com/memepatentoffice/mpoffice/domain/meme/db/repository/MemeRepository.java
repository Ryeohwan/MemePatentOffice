package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemeRepository extends JpaRepository<Meme,Long> {
    Optional<Meme> findMemeByTitle(String title);
    Boolean existsMemeByTitle(String title);
    @Query("SELECT count (m) from Meme m")
    int countAll();
    @Override
    <S extends Meme> S save(S entity);
    List<Meme> findAllByOwnerIdOrderByCreatedAtDesc(Long userId);

}
