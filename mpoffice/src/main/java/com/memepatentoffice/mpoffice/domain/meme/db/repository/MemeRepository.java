package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemeRepository extends JpaRepository<Meme,Long> {
    Meme findMemeByTitle(String title);

    Boolean existsMemeByTitle(String title);
    @Override
    <S extends Meme> S save(S entity);
}
