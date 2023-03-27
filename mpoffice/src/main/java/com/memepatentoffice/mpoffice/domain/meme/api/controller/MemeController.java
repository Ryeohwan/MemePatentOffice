package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.domain.meme.api.request.LikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.LikeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@RequestMapping("api/meme")
@RestController
public class MemeController {
    @Autowired
    MemeService memeService;
    @Autowired
    GcpService gcpService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/{title}")
    public ResponseEntity getMeme(@PathVariable String title){
        MemeResponse result = memeService.findByTitle(title);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/check/{title}")
    public ResponseEntity titleDuplicatedcheck(@PathVariable String title){
        String result = memeService.titleCheck(title);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createMeme(MemeCreateRequest memeCreateRequest) throws Exception{
        if( memeService.titleCheck(memeCreateRequest.getTitle()) == "fail"){
            return ResponseEntity.ok().body("Title is already exist");
        }
        memeCreateRequest.setCreatedAt(LocalDateTime.now());
        String img = gcpService.uploadFile(memeCreateRequest.getFile());
        memeCreateRequest.setImageUrl(img);
        String result = memeService.createMeme(memeCreateRequest);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/like")
    @ResponseBody
    public ResponseEntity createLike(LikeRequest like) throws Exception {
        LikeResponse result = memeService.memeLike(like);
        return ResponseEntity.ok().body(result);
    }


////    image upload test
//    @PostMapping("/upload")
//    @ResponseBody
//    public ResponseEntity upload(@RequestBody MultipartFile file)throws IOException {
//        String url = gcpService.uploadFile(file);
//        return ResponseEntity.ok().body(url);
//    }

    // Get Test
//    @GetMapping("/test/{test}")
//    public ResponseEntity testHi(@PathVariable String test){
//        System.out.println("came");
//        return ResponseEntity.ok().body(test);
//    }


}
