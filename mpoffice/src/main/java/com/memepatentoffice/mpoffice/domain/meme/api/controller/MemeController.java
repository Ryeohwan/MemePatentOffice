package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @GetMapping("/get")
    public ResponseEntity getMeme(@PathVariable MemeCreateRequest memeCreateRequest){
        MemeResponse result = memeService.findByTitle(memeCreateRequest.getTitle());
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createMeme(@RequestBody MemeCreateRequest memeCreateRequest){
        String result = memeService.createMeme(memeCreateRequest);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity upload(@RequestBody MultipartFile file)throws IOException {
        String url = gcpService.uploadFile(file);
        return ResponseEntity.ok().body(url);
    }

    @GetMapping("/test")
    public ResponseEntity testHi(@PathVariable String test){
        System.out.println("came");
        return ResponseEntity.ok().body(test);
    }

}
