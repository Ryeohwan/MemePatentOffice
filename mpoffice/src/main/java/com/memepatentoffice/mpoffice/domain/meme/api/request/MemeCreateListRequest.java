package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class MemeCreateListRequest {
    private String content;
    private Long createrId;
    private String title;
    private String imageUrl;
    private String situation;

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreaterId(Long createrId) {
        this.createrId = createrId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setSituation(String situation){this.situation = situation;}
}
