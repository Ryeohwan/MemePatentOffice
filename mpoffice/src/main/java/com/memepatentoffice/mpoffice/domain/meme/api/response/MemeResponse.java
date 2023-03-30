package com.memepatentoffice.mpoffice.domain.meme.api.response;

import com.memepatentoffice.mpoffice.db.entity.Cart;
import com.memepatentoffice.mpoffice.db.entity.MemeLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemeResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String ownerNickname;
    private String createrNickname;
    @Enumerated(EnumType.STRING)
    private Cart cart;
    @Enumerated(EnumType.STRING)
    private MemeLike memeLike;
    private int likeCount;
    private int hateCount;
    private int searched;
    private String situation;
    private String userProfileImage;
    public void setCart(Cart cart){
        this.cart = cart;
    }

    public void setMemeLike(MemeLike like){
        this.memeLike = memeLike;
    }

}
