package com.memepatentoffice.mpoffice.domain.meme.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t.price from Transaction t order by t.createdAt desc ")
    List<Double> findPriceList(Long memeId);

    @Query("SELECT t.price from Transaction t order by t.price desc ")
    List<Double> PricaRankList(Long memeId);

    @Query("SELECT t from Transaction t order by t.createdAt desc ")
    List<Transaction> findBuyerList();

    List<Transaction> findAllByBuyerId(Long userId);
    List<Transaction> findAllBySellerId(Long userId);
}
