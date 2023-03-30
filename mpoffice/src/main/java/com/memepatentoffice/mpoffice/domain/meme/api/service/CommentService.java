package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserCommentLikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeLikeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    private final UserMemeLikeRepository userMemeLikeRepository;
    @Transactional
    public Long createCommenmt(CommentRequest commentRequest) throws NotFoundException {
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈입니다"));
        if(commentRequest.getParentCommentId() != null){
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


    public CommentResponse findComment(CommentInfoRequest commentInfoRequest)throws NotFoundException{
        Comment com = commentRepository.findCommentById(commentInfoRequest.getId()).orElseThrow(() -> new NotFoundException("해당하는 밈이 없습니다."));
        Long userId = com.getUser().getId();
        Long memeId = com.getMeme().getId();
        CommentResponse result = CommentResponse.builder()
                .profileImage(com.getUser().getProfileImage())
                .nickname(com.getUser().getNickname())
                .heartCnt(userMemeLikeRepository.countUserMemeLikesByUserId(userId))
                .liked(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId,memeId))
                .replyCommentCnt(commentRepository.countAllByParentCommentId(com.getId()))
                .content(com.getContent())
                .id(com.getId())
                .createdAt(com.getCreatedAt())
                .build();
        return result;
    }

    public Slice<Comment> findTop(Long memeId){
        return commentRepository.findBestThreeComment(memeId);
    }

    public Slice<Comment> findLatest(Long memeId,Long id1, Long id2, Long id3, Pageable pageable){
        return commentRepository.findLatestComment(memeId,id1,id2,id3,pageable);
    }

    public Slice<Comment> findOldest(Long memeId,Long id1, Long id2, Long id3, Pageable pageable){
        return commentRepository.findOldestComment(memeId,id1,id2,id3,pageable);
    }

    public Slice<Comment> findPopular(Long memeId,Long id1, Long id2, Long id3, Pageable pageable){
        return commentRepository.findPopularComment(memeId,id1,id2,id3,pageable);
    }
}
