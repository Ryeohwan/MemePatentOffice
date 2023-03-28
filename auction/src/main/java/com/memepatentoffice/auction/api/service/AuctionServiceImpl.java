package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.api.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.response.AuctionRes;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import com.memepatentoffice.auction.db.entity.Auction;
import com.memepatentoffice.auction.db.repository.AuctionRepository;
import com.memepatentoffice.auction.util.AuctionStarter;
import com.memepatentoffice.auction.util.AuctionTerminator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuctionServiceImpl implements AuctionService{
    private final AuctionRepository auctionRepository;

    @Transactional
    @Override
    public Long enrollAuction(AuctionCreationReq auctionCreationReq) {
        //memeId 있는지 찾기
        LocalDateTime startLocalDateTime = auctionCreationReq.getStartDateTime();
        Date startDate = Timestamp.valueOf(startLocalDateTime);
        new Timer().schedule(
                AuctionStarter.builder()
                        .auctionRepository(auctionRepository)
                        .memeId(auctionCreationReq.getMemeId())
                        .build(),
                startDate);
        new Timer().schedule(
                AuctionTerminator.builder()
                        .auctionRepository(auctionRepository)
                        .auctionId(auctionId)
                        .build(),
                endDate);
    }

    @Override
    public List<AuctionRes> findAll() {
        return auctionRepository.findAll().stream()
                .map(AuctionRes::new)
                .collect(Collectors.toList());
    }

    @Override
    public AuctionRes findById(Long id) throws NotFoundException {
        if(!auctionRepository.existsById(id)){
            throw new NotFoundException("존재하지 않는 경매 아이디입니다.");
        }
        return new AuctionRes(auctionRepository.findById(id).or);
    }
}
