package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.memepatentoffice.mpoffice.db.entity.Cart;
import com.memepatentoffice.mpoffice.db.entity.UserMemeAuctionAlert;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartRequest {
    private Long userId;
    private Long memeId;
    @Enumerated(EnumType.STRING)
    private Cart cart;


}
