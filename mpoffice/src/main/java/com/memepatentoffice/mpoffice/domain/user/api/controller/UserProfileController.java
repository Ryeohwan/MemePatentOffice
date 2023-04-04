package com.memepatentoffice.mpoffice.domain.user.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserImageResponse;;
import com.memepatentoffice.mpoffice.domain.user.api.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/mpoffice/user/profile")
@RestController
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/image/{nickname}")
    public ResponseEntity getUserImage(@PathVariable("nickname") String nickname) throws NotFoundException {
        User user = userProfileService.getUserImage(nickname);
        UserImageResponse userImageResponse = UserImageResponse.builder()
                .imgUrl(user.getProfileImage())
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(userImageResponse);
    }
    @GetMapping("/memes/{nickname}")
    public ResponseEntity getUserMemes(@PathVariable("nickname") String nickname) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userProfileService.getUserMemeList(nickname));
    }

    @GetMapping("/auctions/{nickname}")
    public ResponseEntity getUserAuctions(@PathVariable("nickname") String nickname) {
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

}
