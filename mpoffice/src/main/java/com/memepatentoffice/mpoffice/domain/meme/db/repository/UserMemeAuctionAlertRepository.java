package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.UserMemeAuctionAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMemeAuctionAlertRepository extends JpaRepository<UserMemeAuctionAlert, Long> {

    List<UserMemeAuctionAlert> findAllByMemeId(Long memeId);
}
