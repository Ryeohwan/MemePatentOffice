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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.querydsl.QPageRequest;
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
        Optional<Comment> parentComment = commentRepository.findById(commentRequest.getParentId());
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
                .userName(user.getNickname())
                .userImgUrl(user.getProfileImage())
                .comment(commentRequest.getContent())
                .date(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .parentId(parentComment.get().getId())
                .liked(userCommentLikeRepository.existsByUserIdAndCommentId(user.getId(),parentComment.get().getId()))
                .likes(userCommentLikeRepository.countUserCommentLikesByCommentId(com.getId()))
                .parentName(parentComment.get().getUser().getNickname())
                .build();
        return result;
    }

    @Transactional
    public CommentCreateResponse createComment(CommentRequest commentRequest) throws NotFoundException {
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
                .Id(created.getId())
                .likes(userMemeLikeRepository.countUserMemeLikesByUserIdAndMemeId(user.getId(),meme.getId()))
                .userId(user.getId())
                .userImgUrl(user.getProfileImage())
                .userName(user.getNickname())
                .comment(commentRequest.getContent())
                .date(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .liked(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(user.getId(),meme.getId()))
                .replyCommentCnt(commentRepository.countAllByParentCommentId(created.getId()))
                .best(0)
                .build();
        return result;
    }

    public int findBestThree(){
        return 0;
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
                .heartCnt(userMemeLikeRepository.countUserMemeLikesByUserIdAndMemeId(userId,memeId))
                .liked(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId,memeId))
                .replyCommentCnt(commentRepository.countAllByParentCommentId(com.getId()))
                .content(com.getContent())
                .id(com.getId())
                .createdAt(com.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
        return result;
    }

    public Slice<CommentResponse> findTop(Long memeId){

        Slice<Object> temp = commentRepository.findBestThreeComment(memeId, PageRequest.of(0,3));
        Slice<CommentResponse> result = convertToDtoTop(temp);
        return result;
    }

    public Slice<CommentResponse> findLatest(Long memeId,Long id1, Long id2, Long id3, Pageable pageable){
        Slice<Object> temp =commentRepository.findLatestComment(memeId,id1,id2,id3,pageable);
        Slice<CommentResponse> result = convertToDtoLatest(temp);
        return result;
    }

    public Slice<CommentResponse> convertToDtoTop(Slice<Object> slice) {
        List<CommentResponse> dtoList = new ArrayList<>();
        for (Object obj : slice.getContent()) {
            Object[] arr = (Object[]) obj;
            String content = (String) arr[0];
            LocalDateTime createdAt = (LocalDateTime) arr[1];
            Long replyCommentCnt = (Long) arr[2];
            Long id = (Long) arr[3];
            String nickname = (String) arr[4];
            String profileImage = (String) arr[5];
            Long heartCnt = (Long)arr[6];
            Boolean liked = (Boolean) arr[7];
            CommentResponse dto = CommentResponse.builder()
                    .content(content)
                    .createdAt(createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .replyCommentCnt(replyCommentCnt.intValue())
                    .id(id)
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .heartCnt(heartCnt.intValue())
                    .liked(liked)
                    .best(1)
                    .build();
            dtoList.add(dto);
        }
        return new SliceImpl<>(dtoList, slice.getPageable(), slice.hasNext());
    }

    public Slice<CommentResponse> convertToDtoLatest(Slice<Object> slice) {
        List<CommentResponse> dtoList = new ArrayList<>();
        for (Object obj : slice.getContent()) {
            Object[] arr = (Object[]) obj;
            String content = (String) arr[0];
            LocalDateTime createdAt = (LocalDateTime) arr[1];
            Long replyCommentCnt = (Long) arr[2];
            Long id = (Long) arr[3];
            String nickname = (String) arr[4];
            String profileImage = (String) arr[5];
            Long heartCnt = (Long)arr[6];
            Boolean liked = (Boolean) arr[7];
            CommentResponse dto = CommentResponse.builder()
                    .content(content)
                    .createdAt(createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .replyCommentCnt(replyCommentCnt.intValue())
                    .id(id)
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .heartCnt(heartCnt.intValue())
                    .liked(liked)
                    .best(1)
                    .build();
            dtoList.add(dto);
        }
        return new SliceImpl<>(dtoList, slice.getPageable(), slice.hasNext());
    }

}
