package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.db.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatServiceImpl {
    private ChatRepository chatRepository;
}
