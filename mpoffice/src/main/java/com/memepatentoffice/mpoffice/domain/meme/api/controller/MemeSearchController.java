package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeListResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeSearchService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mpoffice/meme/search")
public class MemeSearchController {

    final private MemeSearchService memeSearchService;

    @GetMapping("")
    public ResponseEntity<Slice<MemeListResponse>> getMemeList(
            @RequestParam(value = "idx", defaultValue = "0") long Idx,
            @RequestParam(value = "search", required = false) String searchText,
            @PageableDefault(size = 10, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(memeSearchService.getMemeList(Idx, pageable, searchText));
    }

    @GetMapping("/popular")
    public ResponseEntity<Slice<MemeListResponse>> getPopularMemeList(
            @RequestParam(value = "days", defaultValue = "all") String days,
            @RequestParam(value = "idx", defaultValue = "0") long Idx,
            @RequestParam(value = "search", required = false) String searchText,
            @PageableDefault(size = 10, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(memeSearchService.getPopularMemeList(days, Idx, pageable, searchText));
    }
}

