package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t.price from Transaction t order by t.createdAt desc ")
    List<Double> findPriceList(Long memeId);

    @Query("SELECT t.price from Transaction t where t.memeId = :memeId order by t.price desc ")
    List<Double> PricaRankList(@Param("memeId") Long memeId);

    @Query("SELECT t from Transaction t where t.memeId = :memeId order by t.createdAt desc ")
    List<Transaction> findBuyerList(@Param("memeId") Long memeId);

    List<Transaction> findAllByBuyerId(Long userId);
    List<Transaction> findAllBySellerId(Long userId);
}
