package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemeRepository extends JpaRepository<Meme,Long> {
    Optional<Meme> findMemeByTitle(String title);

    Boolean existsMemeByTitle(String title);
    @Override
    <S extends Meme> S save(S entity);
}
