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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MemeRepository memeRepository;
    private final UserCommentLikeRepository userCommentLikeRepository;
    @Transactional
    public Long createCommenmt(CommentRequest commentRequest) throws NotFoundException {
        System.out.println("user" + commentRequest.getUserId());
        System.out.println("밈" + commentRequest.getMemeId());
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈입니다"));
        System.out.println("호출은 하니");
        if(commentRequest.getParentCommentId() != null){
            System.out.println("hihi");
            Optional<Comment> parentComment = commentRepository.findById(commentRequest.getParentCommentId());
            //optional로 user
            Comment com = new Comment().builder()
                    .content(commentRequest.getContent())
                    .user(user)
                    .meme(meme)
                    .parentComment(parentComment.get())
                    .isValid(IsValid.VALID)
                    .createdAt(LocalDateTime.now())
                    .build();
            return commentRepository.save(com).getId();
        }else {
            System.out.println("없는 곳으로 오니");
            Comment com = new Comment().builder()
                    .content(commentRequest.getContent())
                    .user(user)
                    .meme(meme)
                    .isValid(IsValid.VALID)
                    .createdAt(LocalDateTime.now())
                    .build();
            return commentRepository.save(com).getId();
        }

    }

    @Transactional
    public boolean createCommentLike(CommentLikeRequest commentLikeRequest) throws NotFoundException{
        System.out.println(commentLikeRequest.getCommentId());
        System.out.println(commentLikeRequest.getUserId());
        //중복 검증 로직 추가
        UserCommentLike temp = new UserCommentLike().builder()
                .comment(commentRepository.findById(commentLikeRequest.getCommentId())
                        .orElseThrow(()->new NotFoundException("유효하지 않은 댓글입니다")))
                .user(userRepository.findById(commentLikeRequest.getUserId())
                                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다")))
                .build();
        userCommentLikeRepository.save(temp);
        return true;
    }

    public void CommentList(Long id) throws NotFoundException{
        List<Comment> list = commentRepository.findCommentsByMemeId(id);
    }





}
