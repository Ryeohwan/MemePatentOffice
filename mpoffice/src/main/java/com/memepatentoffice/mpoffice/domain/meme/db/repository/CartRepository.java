package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeAuctionAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<UserMemeAuctionAlert,Long> {
    Boolean existsUserMemeAuctionAlertByUserIdAndMemeId(Long userId, Long memeId);
    UserMemeAuctionAlert findUserMemeAuctionAlertByUserIdAndMemeId(Long userId, Long memeId);
    List<UserMemeAuctionAlert> findAllByUserId(Long userId);
}
