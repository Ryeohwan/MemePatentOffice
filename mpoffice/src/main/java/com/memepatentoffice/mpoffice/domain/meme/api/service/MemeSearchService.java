package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.Search;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeListResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.ReplyResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.SearchResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeSearchRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public List<SearchResponse> getdailyBest(){
        LocalDateTime a = LocalDateTime.now();
        LocalDateTime oneDayago = a.minusDays(1);
        List<Object[]> all = searchRepository.findDailyRanking(a,oneDayago);
        List<SearchResponse> result = new ArrayList<>();
        int ranking = 1;
        for(Object b: all){
            if(ranking == 10){
                break;
            }
            Object[] arr = (Object[]) b;
            String title = (String) arr[0];
            Long count =  (Long) arr[1];
            SearchResponse temp = SearchResponse.builder()
                    .rank(ranking)
                    .title(title)
                    .count(count.intValue())
                    .build();
            result.add(temp);
            ranking += 1;
        }

        return result;
    }

    public List<SearchResponse> getweeklyBest(){
        LocalDateTime a = LocalDateTime.now();
        LocalDateTime oneWeekago = a.minusWeeks(1);
        List<Object[]> all = searchRepository.findDailyRanking(a,oneWeekago);
        List<SearchResponse> result = new ArrayList<>();
        int ranking = 1;
        for(Object b: all){
            if(ranking == 10){
                break;
            }
            Object[] arr = (Object[]) b;
            String title = (String) arr[0];
            Long count =  (Long) arr[1];
            SearchResponse temp = SearchResponse.builder()
                    .rank(ranking)
                    .title(title)
                    .count(count.intValue())
                    .build();
            result.add(temp);
            ranking += 1;
        }

        return result;
    }

//    private Slice<ReplyResponse> checkReplyLastPage(Pageable pageable, List<ReplyResponse> results) {
//
//        boolean hasNext = true;
//
//        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
//        if (results.size() < pageable.getPageSize()) {
//            hasNext = false;
//        }
//        return new SliceImpl<>(results, pageable, hasNext);
//    }
}
