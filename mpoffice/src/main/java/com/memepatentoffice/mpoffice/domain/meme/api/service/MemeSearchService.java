package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemeSearchService {

    private final MemeSearchRepository memeSearchRepository;
    public Slice<Meme> getMemeList(Long lastId, Pageable pageable, String searchText) {
        return memeSearchRepository.searchMemeList(lastId, searchText, pageable);
    }

//    public Slice<Meme> getPopularMemeList(Long lastId, Pageable pageable, String searchText) {
//        return memeSearchRepository.searchPopularMemeList(lastId, searchText, pageable);
//    }
}
