package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.CommentService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/mpoffice/meme/comment")
@RequiredArgsConstructor
public class CommentController {
    private final MemeService memeService;
    private final CommentService commentService;
    @GetMapping("/check/{title}")
    public ResponseEntity titleDuplicatedcheck(@PathVariable String title){
        String result = memeService.titleCheck(title);
        return ResponseEntity.ok(result);
    }
    // 밈 만들기
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createComment(@RequestBody CommentRequest commentRequest) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createCommenmt(commentRequest));
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

    @GetMapping("/list/latest/{id}")
    public ResponseEntity latestComment(@PathVariable("id") Long id){
        return ResponseEntity.ok("result");
    }


}
