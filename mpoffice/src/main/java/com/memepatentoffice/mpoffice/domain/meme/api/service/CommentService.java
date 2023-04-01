package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentCreateResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.ReplyResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.*;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    public ReplyResponse createReply(CommentRequest commentRequest) throws NotFoundException {
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈입니다"));
        Optional<Comment> parentComment = commentRepository.findById(commentRequest.getParentComment());
        //optional로 user
        Comment com = new Comment().builder()
                .content(commentRequest.getContent())
                .user(user)
                .meme(meme)
                .parentComment(parentComment.get())
                .isValid(IsValid.VALID)
                .createdAt(LocalDateTime.now())
                .build();
        commentRepository.save(com);
        ReplyResponse result = ReplyResponse.builder()
                .nickName(user.getNickname())
                .profileImage(user.getProfileImage())
                .content(commentRequest.getContent())
                .createdAt(commentRequest.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .originId(parentComment.get().getId())
                .originNickName(parentComment.get().getUser().getNickname())
                .build();
        return result;
    }

    @Transactional
    public CommentCreateResponse createCommenmt(CommentRequest commentRequest) throws NotFoundException {
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(() -> new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(() -> new NotFoundException("유효하지 않은 밈입니다"));
        Comment com = new Comment().builder()
                .content(commentRequest.getContent())
                .user(user)
                .meme(meme)
                .isValid(IsValid.VALID)
                .createdAt(LocalDateTime.now())
                .build();
        Comment created = commentRepository.save(com);
        CommentCreateResponse result = CommentCreateResponse.builder()
                .commentId(created.getId())
                .likeCount(userMemeLikeRepository.countUserMemeLikesByUserId(user.getId()))
                .createrId(user.getId())
                .userProfile(user.getProfileImage())
                .nickName(user.getNickname())
                .content(commentRequest.getContent())
                .createdAt(commentRequest.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .liked(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(user.getId(),meme.getId()))
                .replyCount(commentRepository.countAllByParentCommentId(created.getId()))
                .build();
        return result;
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
                .createdAt(com.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
        return result;
    }

    public Slice<CommentResponse> findTop(Long memeId){
        Slice<Object> temp = commentRepository.findBestThreeComment(memeId);
        Slice<CommentResponse> result = convertToDto(temp);
        return result;
    }

    public Slice<CommentResponse> findLatest(Long memeId,Long id1, Long id2, Long id3, Pageable pageable){
        Slice<Object> temp =commentRepository.findLatestComment(memeId,id1,id2,id3,pageable);
        Slice<CommentResponse> result = convertToDto(temp);
        return result;
    }

    public Slice<CommentResponse> convertToDto(Slice<Object> slice) {
        List<CommentResponse> dtoList = new ArrayList<>();
        for (Object obj : slice.getContent()) {
            Long heartCntLong = (Long) ((Object[]) obj)[6];
            Integer heartCnt = heartCntLong != null ? heartCntLong.intValue() : null;
            LocalDateTime a = (LocalDateTime) ((Object[]) obj)[1];
            String createdAt = a.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            CommentResponse dto = CommentResponse.builder()
                    .content((String) ((Object[]) obj)[0])
                    .createdAt(createdAt)
                    .replyCommentCnt((int) ((Object[]) obj)[2])
                    .id((long) ((Object[]) obj)[3])
                    .nickname((String) ((Object[]) obj)[4])
                    .profileImage((String) ((Object[]) obj)[5])
                    .heartCnt(heartCnt)
                    .liked((Boolean) ((Object[]) obj)[7])
                    .build();
            dtoList.add(dto);
        }
        return new SliceImpl<>(dtoList, slice.getPageable(), slice.hasNext());
    }

}
