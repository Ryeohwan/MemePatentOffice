package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemeResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Long ownerId;
    private Long createrId;

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setCreaterId(Long createrId) {
        this.createrId = createrId;
    }

    @Builder
    public MemeResponse(Long id, String title, String content, LocalDateTime createdAt, Long ownerId, Long createrId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.ownerId = ownerId;
        this.createrId = createrId;
    }

    public MemeResponse() {
    }
}
