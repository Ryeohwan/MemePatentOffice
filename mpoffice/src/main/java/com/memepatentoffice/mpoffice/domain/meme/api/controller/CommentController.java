package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping("api/meme/comment")
@RequiredArgsConstructor
public class CommentController {
    @Autowired
    MemeService memeService;
    @Autowired
    GcpService gcpService;
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
    public ResponseEntity createMeme(MemeCreateRequest memeCreateRequest) throws Exception{
        memeCreateRequest.setCreatedAt(LocalDateTime.now());
        String img = gcpService.uploadFile(memeCreateRequest.getFile());
        memeCreateRequest.setImageUrl(img);
        String result = memeService.createMeme(memeCreateRequest);
        return ResponseEntity.ok().body(result);
    }
}
