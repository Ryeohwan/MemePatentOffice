package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeAuctionAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<UserMemeAuctionAlert,Long> {
    Boolean existsUserMemeAuctionAlertByUserAndMeme(Long userId, Long memeId);
    UserMemeAuctionAlert findUserMemeAuctionAlertByUserAndMeme(User user, Meme meme);
}
