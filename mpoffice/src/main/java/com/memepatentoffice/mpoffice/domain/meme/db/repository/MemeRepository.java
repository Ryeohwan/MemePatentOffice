package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemeRepository extends JpaRepository<Meme,Long> {
    Meme findMemeByTitle(String title);

    Boolean existsMemeByTitle(String title);

    Boolean existsMemeById(Long id);

    Meme findMemeById(Long id) throws NotFoundException;
    @Override
    <S extends Meme> S save(S entity);
}
