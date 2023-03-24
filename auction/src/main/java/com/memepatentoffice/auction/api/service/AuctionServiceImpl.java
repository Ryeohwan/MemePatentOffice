package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService{
    private AuctionRepository auctionRepository;


    @Transactional
    @Override
    public Long save(Long memeId) {
        return auctionRepository.save(new Auction(memeId)).getId();
    }

    @Override
    public List<Auction> findAll() {
        return auctionRepository.findAll();
    }

    @Override
    public Auction findById(Long id) throws NotFoundException {
        return auctionRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }
}
