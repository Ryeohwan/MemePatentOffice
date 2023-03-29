package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
public class MemeCreateRequest {
    private String content;
    private MultipartFile file;
    private Long createrId;
    private Long ownerId;
    private String title;
    private String imageUrl;
    private String situation;

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreaterId(Long createrId) {
        this.createrId = createrId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setFile(MultipartFile file){
        this.file = file;
    }

    public Meme toEntity(User creater, User owner){
        return Meme.builder()
                .creater(creater)
                .owner(owner)
                .title(title)
                .content(content)
                .imageurl(imageUrl)
                .situation(situation)
                .build();
    }

    @Builder
    public MemeCreateRequest(String content, Long createrId, Long ownerId, String title, String imageUrl, String situation) {
        this.content = content;
        this.createrId = createrId;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.situation = situation;
    }
}
