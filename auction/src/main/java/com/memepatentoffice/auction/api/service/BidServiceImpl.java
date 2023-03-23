package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.db.repository.BidsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BidServiceImpl implements BidService{
    private BidsRepository bidsRepository;
}
