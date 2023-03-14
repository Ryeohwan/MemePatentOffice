package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemeService {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final MemeRepository memeRepository;

    public MemeResponse findByTitle(String title){
        Meme meme = memeRepository.findMemeByTitle(title);
        MemeResponse result = new MemeResponse();

        return result;
    }

}
