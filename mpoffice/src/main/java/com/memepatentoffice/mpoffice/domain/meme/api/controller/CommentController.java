package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.google.api.Http;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.CommentService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    private final CommentRepository commentRepository;

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
            return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createReply(commentRequest));
        }else{
            System.out.println("this is comment");
            return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(commentRequest));
        }

    }
    @PostMapping("/like")  // 좋아요 기능 완료
    @ResponseBody
    public ResponseEntity createLike(@RequestBody CommentLikeRequest commentLikeRequest) throws NotFoundException{
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createCommentLike(commentLikeRequest));
    }
    @PostMapping("/info")
    @ResponseBody
    public ResponseEntity aboutComment(@RequestBody CommentInfoRequest commentInfoRequest)throws NotFoundException{
        CommentResponse result = commentService.findComment(commentInfoRequest);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/bestList")
    public ResponseEntity BestList(@RequestParam(name = "memeId") Long memeId,@PageableDefault(value = 3) Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findTop(memeId));
    }
    @GetMapping("/list")
    public ResponseEntity CommentList(
                                      @RequestParam(name = "memeId") Long memeId,
                                      @RequestParam(required = false,name = "id1")Long id1,
                                      @RequestParam(required = false,name = "id2")Long id2,
                                      @RequestParam(required = false,name = "id3")Long id3,
                                      @PageableDefault(value = 8) Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.findLatest(memeId,id1,id2,id3,pageable));
    }

}
