package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CommentRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.service.CommentService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("api/meme/comment")
@RequiredArgsConstructor
public class CommentController {
    private final MemeService memeService;
    private final CommentService commentService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/check/{title}")
    public ResponseEntity titleDuplicatedcheck(@PathVariable String title){
        String result = memeService.titleCheck(title);
        return ResponseEntity.ok(result);
    }
    // 밈 만들기
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createComment(CommentRequest commentRequest) throws NotFoundException {
        if (commentService.createCommenmt(commentRequest)){
            return ResponseEntity.ok().body(SUCCESS);
        }else{
            return ResponseEntity.ok().body(FAIL);
        }
    }

    @PostMapping("/like")
    @ResponseBody
    public ResponseEntity createLike(CommentLikeRequest commentLikeRequest) throws NotFoundException{
        return ResponseEntity.ok().body(commentService.createCommentLike(commentLikeRequest));
    }


}
