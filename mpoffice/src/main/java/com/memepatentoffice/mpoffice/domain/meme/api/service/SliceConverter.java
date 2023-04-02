package com.memepatentoffice.mpoffice.domain.meme.api.service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

import java.util.List;

public class SliceConverter {

    /**
     * 주어진 List를 Slice로 변환합니다.
     *
     * @param list    변환할 List
     * @param page    페이지 번호
     * @param size    페이지 크기
     * @param sort    정렬 기준
     * @param <T>     리스트의 타입
     * @return        변환된 Slice
     */
    public static <T> Slice<T> convert(List<T> list, int page, int size, Sort sort) {
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, list.size());
        List<T> content = list.subList(fromIndex, toIndex);

        return new SliceImpl<>(content, PageRequest.of(page, size, sort), list.size() > toIndex);
    }

    /**
     * 주어진 List를 Slice로 변환합니다. (기본 정렬 기준 사용)
     *
     * @param list    변환할 List
     * @param page    페이지 번호
     * @param size    페이지 크기
     * @param <T>     리스트의 타입
     * @return        변환된 Slice
     */
    public static <T> Slice<T> convert(List<T> list, int page, int size) {
        return convert(list, page, size, Sort.unsorted());
    }
}