package com.memepatentoffice.auction.api.service;

import com.memepatentoffice.auction.db.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl {
    private ChatRepository chatRepository;
}
