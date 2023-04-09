package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.google.api.Http;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentDeleteRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.ReplyResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.CommentService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import com.memepatentoffice.mpoffice.domain.user.api.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/mpoffice/meme/comment")
@RequiredArgsConstructor
public class CommentController {
    private final MemeService memeService;
    private final CommentService commentService;
    private final AlarmService alarmService;

    @GetMapping("/check/{title}")
    public ResponseEntity titleDuplicatedcheck(@PathVariable String title){
        String result = memeService.titleCheck(title);
        return ResponseEntity.ok(result);
    }
    // 밈 만들기
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createComment(@RequestBody CommentRequest commentRequest) throws NotFoundException {
        if(commentRequest.getParentId() != null){
            System.out.println("hi this is reply");
            ReplyResponse reply = commentService.createReply(commentRequest);
            // Reply 알람 등록
            // 대댓글을 단 사람과 댓글을 단 사람이 같지 않을때

            if(!reply.getNickname().equals(reply.getParentName())) {
                alarmService.addReplyAlarm(reply.getId(), reply.getUserId(), commentRequest.getMemeId(), reply.getParentId());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(reply);
        }else{
            System.out.println("this is comment");
            CommentResponse comment = commentService.createComment(commentRequest);
            // Comment 알람등록
            // 밈의 주인과 댓글을 쓴 사람이 같지 않을 때
            MemeResponse memeResponse  = memeService.findById(commentRequest.getMemeId());
            if(!memeResponse.getOwnerNickname().equals(comment.getNickname())){
                alarmService.addCommentAlarm(comment.getId(), commentRequest.getMemeId(), commentRequest.getUserId());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        }

    }
    @PostMapping("/like")  // 좋아요 기능 완료
    @ResponseBody
    public ResponseEntity createLike(@RequestBody CommentLikeRequest commentLikeRequest) throws NotFoundException{
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createCommentLike(commentLikeRequest));
    }
//    @PostMapping("/info")
//    @ResponseBody
//    public ResponseEntity aboutComment(@RequestBody CommentInfoRequest commentInfoRequest)throws NotFoundException{
//        CommentResponse result = commentService.findComment(commentInfoRequest);
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }

    @GetMapping("/bestList")
    public ResponseEntity BestList(@RequestParam(name = "memeId") Long memeId,
                                   @RequestParam(name = "userId") Long userId,
                                   @PageableDefault(value = 3) Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findTop(memeId,userId));
    }
    @GetMapping("/list")
    // 최신순으로 받기 댓글만 조회
    public ResponseEntity CommentList(
                                      @RequestParam(name = "memeId") Long memeId,
                                      @RequestParam(name = "userId") Long userId,
                                      @RequestParam(required = false,name = "idx")Long idx,
                                      @PageableDefault(size = 8) Pageable pageable
                                      ){
        Long id1 = null;
        Long id2 = null;
        Long id3 = null;
        switch (commentService.findTop(memeId,userId).getContent().size()){
            case 3:
                id1 = commentService.findTop(memeId,userId).getContent().get(0).getId();
                id2 = commentService.findTop(memeId,userId).getContent().get(1).getId();
                id3 = commentService.findTop(memeId,userId).getContent().get(2).getId();
                break;
            case 2:
                id1 = commentService.findTop(memeId,userId).getContent().get(0).getId();
                id2 = commentService.findTop(memeId,userId).getContent().get(1).getId();
                break;
            case 1:
                id1 = commentService.findTop(memeId,userId).getContent().get(0).getId();
        }
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findLatest(memeId,userId,id1,id2,id3,idx,pageable));
    }

    @GetMapping("/reply")
    // 대댓글받기
    public ResponseEntity ReplyList(
            @RequestParam(name = "memeId") Long memeId,
            @RequestParam(name = "userId") Long userId,
            @RequestParam(name = "commentId") Long commentId,
            @RequestParam(name = "idx",required = false) Long idx,
            @PageableDefault(size = 8)Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findReply(memeId,userId,commentId,idx,pageable));
    }

    @PostMapping("/delete")
    @ResponseBody
    public ResponseEntity deleteComment(@RequestBody CommentDeleteRequest commentDeleteRequest)throws NotFoundException{
        String result = commentService.deleteComment(commentDeleteRequest);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/myComments")
    public ResponseEntity myCommentList(@RequestParam(name = "userId") Long userId,
                                        @RequestParam(name = "idx",required = false) Long idx,
                                        @PageableDefault(size = 8) Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.myComments(userId,idx,pageable));
    }

    @GetMapping("/test")
    public ResponseEntity test(){

        return ResponseEntity.status(HttpStatus.OK).body("why");
    }
}
