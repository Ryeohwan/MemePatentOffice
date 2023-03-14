package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("api/meme")
@RestController
public class MemeController {
    @Autowired
    MemeService memeService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/get")
    public ResponseEntity getMeme(@PathVariable MemeRequest memeRequest){
        MemeResponse result = memeService.findByTitle(memeRequest.getTitle());
        return ResponseEntity.ok().body(result);
    }


}
