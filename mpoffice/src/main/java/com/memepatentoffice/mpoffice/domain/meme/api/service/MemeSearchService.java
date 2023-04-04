package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.Search;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeListResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.SearchResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeSearchRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemeSearchService {

    private final MemeSearchRepository memeSearchRepository;

    private final SearchRepository searchRepository;
    public Slice<MemeListResponse> getMemeList(Long lastId, Pageable pageable, String searchText) {
        if(searchText != null){
            checkingSearched(searchText);
        }
        return memeSearchRepository.searchMemeList(lastId, searchText, pageable);
    }

    public Slice<MemeListResponse> getPopularMemeList(String days, Long lastId, Pageable pageable, String searchText) {
        return memeSearchRepository.searchPopularMemeList(days, lastId, searchText, pageable);
    }

    public Slice<MemeListResponse> getExpensiveMemeList(String days, Long lastId, Pageable pageable, String searchText) {
        return memeSearchRepository.searchExpensiveMemeList(days, lastId, searchText, pageable);
    }

    public Slice<MemeListResponse> getViewsMemeList(String days, Long lastId, Pageable pageable, String searchText) {
        return memeSearchRepository.searchViewsMemeList(days, lastId, searchText, pageable);
    }
    @Transactional
    public void checkingSearched(String keyword){
        Search search = Search.builder()
                .date(LocalDateTime.now())
                .title(keyword)
                .build();
        searchRepository.save(search);
    }

//    public Slice<SearchResponse> getdailyBest(){
//        List<Search> all = searchRepository.findAll();
//        return "a";
//    }
}
