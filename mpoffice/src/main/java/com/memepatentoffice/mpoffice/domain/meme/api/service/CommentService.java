package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserCommentLikeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Long createCommenmt(CommentRequest commentRequest) throws NotFoundException {
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈입니다"));

        Comment parentComment = commentRepository.findById(commentRequest.getParentCommentSeq())
                .orElseThrow(()->new NotFoundException("유효하지 않은 원 댓글입니다"));
        //optional로 user
        Comment com = new Comment().builder()
                .content(commentRequest.getContent())
                .user(user)
                .meme(meme)
                .parentComment(parentComment)
                .isValid(commentRequest.getIsValid())
                .build();
        return commentRepository.save(com).getId();
    }

    @Transactional
    public boolean createCommentLike(CommentLikeRequest commentLikeRequest) throws NotFoundException{
        //중복 검증 로직 추가
        UserCommentLike temp = new UserCommentLike().builder()
                .comment(commentRepository.findById(commentLikeRequest.getCommentId())
                        .orElseThrow(()->new NotFoundException("유효하지 않은 댓글입니다")))
                .user(userRepository.findById(commentLikeRequest.getUserId())
                                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다")))
                .build();
        return true;
    }



}
