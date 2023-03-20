package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.UserCommentLike;
import com.memepatentoffice.mpoffice.db.entity.UserCommentLikeId;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserCommentLikeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MemeRepository memeRepository;

    private final UserCommentLikeRepository userCommentLikeRepository;

    @Transactional
    public boolean createCommenmt(CommentRequest commentRequest) throws NotFoundException {
        Comment com = new Comment().builder()
                .createdAt(LocalDateTime.now())
                .content(commentRequest.getContent())
                .userId(userRepository.findUserById(commentRequest.getUserId()).getId())
                .memeId(memeRepository.findMemeById(commentRequest.getMemeId()).getId())
                .parentCommentSeq(commentRequest.getParentCommentSeq())
                .isValid(commentRequest.getIsValid())
                .updatedAt(LocalDateTime.now())
                .build();
        if(commentRepository.save(com).getContent() == commentRequest.getContent()){
            return true;
        }else{
            return false;
        }
    }

    @Transactional
    public UserCommentLikeId createCommentLike(CommentLikeRequest commentLikeRequest) throws NotFoundException{
        UserCommentLike temp = new UserCommentLike().builder()
                .comment(commentRepository.findCommentById(commentLikeRequest.getComment().getId()))
                .like(commentLikeRequest.getLike())
                .user(userRepository.findUserById(commentLikeRequest.getUser().getId()))
                .build();
        return temp.getId();
    }



}
