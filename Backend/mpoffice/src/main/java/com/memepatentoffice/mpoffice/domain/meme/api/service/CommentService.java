package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentDeleteRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MyCommentList;
import com.memepatentoffice.mpoffice.domain.meme.api.response.ReplyResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.*;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final MemeRepository memeRepository;
    private final UserCommentLikeRepository userCommentLikeRepository;
    @Transactional
    public ReplyResponse createReply(CommentRequest commentRequest) throws NotFoundException {
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 유저입니다"));
        Meme meme = memeRepository.findById(commentRequest.getMemeId())
                .orElseThrow(()->new NotFoundException("유효하지 않은 밈입니다"));
        Optional<Comment> parentComment = commentRepository.findById(commentRequest.getParentId());
        //optional로 user update!!
        Comment com = new Comment().builder()
                .content(commentRequest.getContent())
                .user(user)
                .meme(meme)
                .parentComment(parentComment.get())
                .isValid(IsValid.VALID)
                .createdAt(LocalDateTime.now())
                .build();
        Comment saveResult = commentRepository.save(com);

        System.out.println(saveResult.getUser().getId());

        System.out.println(saveResult.getUser().getNickname());

        ReplyResponse result = ReplyResponse.builder()
                .content(saveResult.getContent())
                .best(0)
                .userId(saveResult.getUser().getId())
                .profileImage(saveResult.getUser().getProfileImage())
                .nickname(saveResult.getUser().getNickname())
                .parentName(saveResult.getParentComment().getUser().getNickname())
                .parentId(saveResult.getParentComment().getId())
                .date(saveResult.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .id(saveResult.getId())
                .liked(userCommentLikeRepository.existsByUserIdAndCommentId(user.getId(),com.getId()))
                .heartCnt(userCommentLikeRepository.countUserCommentLikesByCommentId(com.getId()))
                .build();
        System.out.println(result.getLiked());
        return result;
    }

    @Transactional
    public CommentResponse createComment(CommentRequest commentRequest) throws NotFoundException {
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

        CommentResponse result = CommentResponse.builder()
                .id(created.getId())
                .userId(created.getUser().getId())
                .nickname(created.getUser().getNickname())
                .date(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .liked(userCommentLikeRepository.existsByUserIdAndCommentId(user.getId(),com.getId()))
                .replyCommentCnt(commentRepository.countAllByParentCommentIdAndMemeId(created.getId(),created.getMeme().getId()))
                .best(0)
                .profileImage(created.getUser().getProfileImage())
                .heartCnt(userCommentLikeRepository.countUserCommentLikesByCommentId(created.getId()))
                .content(created.getContent())
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
        if(userCommentLikeRepository.existsByUserIdAndCommentId(temp.getUser().getId(),temp.getComment().getId())){
            userCommentLikeRepository.delete(temp);
            return true;
        }else{
            System.out.println("있니?");
            userCommentLikeRepository.save(temp);
            return true;
        }

    }
    public void CommentList(Long id) throws NotFoundException{
        List<Comment> list = commentRepository.findCommentsByMemeId(id);
    }


//    public CommentResponse findComment(CommentInfoRequest commentInfoRequest)throws NotFoundException{
//        Comment com = commentRepository.findCommentById(commentInfoRequest.getId()).orElseThrow(() -> new NotFoundException("해당하는 밈이 없습니다."));
//        Long userId = com.getUser().getId();
//        Long memeId = com.getMeme().getId();
//        List<UserCommentLike> check = userCommentLikeRepository.findAllByCommentIdAndUserId(com.getId(),userId);
//        Boolean liked = false;
//        int heartCnt = 0;
//        for(UserCommentLike l : check){
//            if(l.getCommentLike().equals(CommentLike.LIKE)){
//                liked = true;
//                heartCnt += 1;
//            }
//        }
//        CommentResponse result = CommentResponse.builder()
//                .profileImage(com.getUser().getProfileImage())
//                .nickname(com.getUser().getNickname())
//                .heartCnt(heartCnt)
//                .liked(liked)
//                .replyCommentCnt(commentRepository.countAllByParentCommentId(com.getId()))
//                .content(com.getContent())
//                .id(com.getId())
//                .date(com.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
//                .build();
//        return result;
//    }

    public Slice<CommentResponse> findTop(Long memeId,Long userId){
        Slice<Object> temp = commentRepository.findBestThreeComment(memeId, userId,PageRequest.of(0,3));
        Slice<CommentResponse> result = convertToDtoTop(temp);
        return result;
    }

    public Slice<CommentResponse> findLatest(Long memeId, Long userId,Long id1, Long id2, Long id3, Long idx, Pageable pageable){
        if(idx == null || idx == 0L){
            idx = Long.MAX_VALUE;
        }
        List<Object> temp = commentRepository.findLatestComment(memeId,userId,id1,id2,id3,idx,PageRequest.of(0,8));
        List<CommentResponse> result = convertToDtoLatest(temp);
        return checkLastPage(pageable,result);
    }

    public Slice<ReplyResponse> findReply(Long memeId, Long userId,Long commentId ,Long idx,Pageable pageable){
        if(idx == null){
            idx = 0L;
        }
        List<Object> temp =commentRepository.findReplyComment(memeId,userId,commentId,idx,PageRequest.of(0,8));
        List<ReplyResponse> result = convertToDtoReply(temp);
        return checkReplyLastPage(pageable,result);
    }

    @Transactional
    public String deleteComment(CommentDeleteRequest commentDeleteRequest)throws NotFoundException{
        User user = userRepository.findById(commentDeleteRequest.getUserId()).orElseThrow(()-> new NotFoundException("존재하지 않는유저입니다."));
        Meme meme = memeRepository.findById(commentDeleteRequest.getMemeId()).orElseThrow(() -> new NotFoundException("존재하지 않는 밈입니다."));
        Comment com = commentRepository.findById(commentDeleteRequest.getCommentId()).orElseThrow(() -> new NotFoundException("존재하지 않는 글입니다."));
        List<Comment> list = commentRepository.findAllByParentCommentId(com.getId());

        if(com.getUser().getId() == user.getId() && com.getMeme().getId() == meme.getId()){
            for(Comment a: list){
                if(a.getMeme().getId() == com.getMeme().getId()){
                    commentRepository.delete(a);
                }
            }
            commentRepository.delete(com);
            return "delete success";
        }else{
            return "delete failed";
        }
    }

    public Slice<MyCommentList> myComments(Long userId,Long idx,Pageable pageable){
        if(idx == null || idx == 0L){
            idx = Long.MAX_VALUE;
        }
        List<MyCommentList> list = convertToCR(commentRepository.findMyListByUserId(userId,idx,PageRequest.of(0,10)));
        return checkMyPage(pageable,list);
    }

    public List<MyCommentList> convertToCR(List<Comment> list){
        List<MyCommentList> all = new ArrayList<>();

        for(Comment a : list){
            Comment c = commentRepository.findById(a.getId()).get();

            MyCommentList temp = MyCommentList.builder()
                    .id(c.getId())
                    .memeId(c.getMeme().getId())
                    .memeImage(c.getMeme().getImageurl())
                    .memeTitle(c.getMeme().getTitle())
                    .content(c.getContent())
                    .date(c.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            if(c.getParentComment() != null && commentRepository.existsByParentCommentId(c.getParentComment().getId())){
                temp.setParentId(c.getParentComment().getId());
            }

            all.add(temp);
        }

        return all;
    }


    public Slice<CommentResponse> convertToDtoTop(Slice<Object> slice) {
        List<CommentResponse> dtoList = new ArrayList<>();
        for (Object obj : slice) {
            Object[] arr = (Object[]) obj;
            String content = (String) arr[0];
            LocalDateTime createdAt = (LocalDateTime) arr[1];
            Long replyCommentCnt = (Long) arr[2];
            Long id = (Long) arr[3];
            String nickname = (String) arr[4];
            String profileImage = (String) arr[5];
            Long heartCnt = (Long)arr[6];
            Boolean liked = (Boolean) arr[7];

            Comment c = commentRepository.findById(id).get();
            int count = 0;
            if(userCommentLikeRepository.existsByUserIdAndCommentId(c.getUser().getId(),c.getId())){
                count = userCommentLikeRepository.countUserCommentLikesByCommentId(c.getId());
            }

            int replyCount = commentRepository.countAllByParentCommentIdAndMemeId(c.getId(),c.getMeme().getId());


            CommentResponse dto = CommentResponse.builder()
                    .content(content)
                    .date(createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .replyCommentCnt(replyCount)
                    .userId(c.getUser().getId())
                    .id(id)
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .heartCnt(count)
                    .liked(liked)
                    .best(1)
                    .build();
            if(replyCount > 4) dtoList.add(dto);
        }
        return new SliceImpl<>(dtoList, slice.getPageable(), slice.hasNext());
    }

    public List<CommentResponse> convertToDtoLatest(List<Object> slice) {
        List<CommentResponse> dtoList = new ArrayList<>();
        for (Object obj : slice) {
            Object[] arr = (Object[]) obj;
            String content = (String) arr[0];
            LocalDateTime createdAt = (LocalDateTime) arr[1];
            Long replyCommentCnt = (Long) arr[2];
            Long id = (Long) arr[3];
            String nickname = (String) arr[4];
            String profileImage = (String) arr[5];
            Long heartCnt = (Long)arr[6];
            Boolean liked = (Boolean) arr[7];

            Comment c = commentRepository.findById(id).get();
            int count = 0;
            if(userCommentLikeRepository.existsByUserIdAndCommentId(c.getUser().getId(),c.getId())){
                count = userCommentLikeRepository.countUserCommentLikesByCommentId(c.getId());
            }

            int replyCount = commentRepository.countAllByParentCommentIdAndMemeId(c.getId(),c.getMeme().getId());

            CommentResponse dto = CommentResponse.builder()
                    .content(content)
                    .date(createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .replyCommentCnt(replyCount)
                    .id(id)
                    .userId(c.getUser().getId())
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .heartCnt(count)
                    .liked(liked)
                    .best(0)
                    .build();

            dtoList.add(dto);
        }
        return dtoList;
    }

    public List<ReplyResponse> convertToDtoReply(List<Object> slice) {
        List<ReplyResponse> dtoList = new ArrayList<>();
        for (Object obj : slice) {
            Object[] arr = (Object[]) obj;
            String content = (String) arr[0];
            LocalDateTime createdAt = (LocalDateTime) arr[1];
            Long id = (Long) arr[2];
            String nickname = (String) arr[3];
            String profileImage = (String) arr[4];
            Long heartCnt = (Long)arr[5];
            Boolean liked = (Boolean) arr[6];
            Comment c = commentRepository.findById(id).get();
            int count = 0;
            if(userCommentLikeRepository.existsByUserIdAndCommentId(c.getUser().getId(),c.getId())){
                count = userCommentLikeRepository.countUserCommentLikesByCommentId(c.getId());
            }

            ReplyResponse dto = ReplyResponse.builder()
                    .content(content)
                    .id(id)
                    .heartCnt(count)
                    .userId(c.getUser().getId())
                    .profileImage(profileImage)
                    .date(createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .nickname(nickname)
                    .parentId(c.getParentComment().getId())
                    .parentName(c.getParentComment().getUser().getNickname())
                    .liked(liked)
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    private Slice<CommentResponse> checkLastPage(Pageable pageable, List<CommentResponse> results) {

        boolean hasNext = true;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() < pageable.getPageSize()) {
            System.out.println("why list here");
            hasNext = false;
        }
        System.out.println(hasNext);
        return new SliceImpl<>(results, pageable, hasNext);
    }

    private Slice<ReplyResponse> checkReplyLastPage(Pageable pageable, List<ReplyResponse> results) {

        boolean hasNext = true;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() < pageable.getPageSize()) {
            hasNext = false;
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }

    private Slice<MyCommentList> checkMyPage(Pageable pageable, List<MyCommentList> results) {

        boolean hasNext = true;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() < pageable.getPageSize()) {
            System.out.println("why list here");
            hasNext = false;
        }
        System.out.println(hasNext);
        return new SliceImpl<>(results, pageable, hasNext);
    }


}
