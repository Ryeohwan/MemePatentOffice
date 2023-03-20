package com.memepatentoffice.mpoffice.domain.user.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.domain.user.api.dto.CommentDto;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserSignUpRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserUpdateRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserWithdrawRequest;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserSignUpResponse;
import com.memepatentoffice.mpoffice.domain.user.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/user")
@RestController
public class UserController {

    private final UserService userService;

//    @ApiResponse(responseCode = "200", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = UserSignUpResponse.class)))
//    @Operation(description = "회원가입 API", summary = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity createUser(@RequestBody UserSignUpRequest userSignUpRequest) {
        UserSignUpResponse userSignUpResponse = userService.createUser(userSignUpRequest);
        return ResponseEntity.ok().body(userSignUpResponse);

    }

//    @ApiResponse(responseCode = "200", description = "회원정보 조회 성공", content = @Content(schema = @Schema(implementation = UserResponse.class)))
//    @ApiResponse(responseCode = "404", description = "회원정보 조회 실패")
//    @Operation(description = "회원정보 조회 API", summary = "회원정보 조회 API")
    @GetMapping("/info/{id}")
    public ResponseEntity getUser(@PathVariable("id") Long id) throws NotFoundException {
        UserResponse userResponse = userService.getUserInfo(id);
        return ResponseEntity.ok().body(userResponse);
    }

//    @ApiResponse(responseCode = "200", description = "회원정보 수정 성공", content = @Content(schema = @Schema(implementation = UserResponse.class)))
//    @ApiResponse(responseCode = "404", description = "회원정보 수정 실패")
//    @Operation(description = "회원정보 수정 API", summary = "회원정보 수정 API")
    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestBody UserUpdateRequest userUpdateRequest) throws NotFoundException {
        UserResponse userResponse = userService.updateUser(userUpdateRequest);
        return ResponseEntity.ok().body(userResponse);
    }

    @GetMapping("/withdraw")
    public ResponseEntity withdrawUser(@RequestBody UserWithdrawRequest userWithdrawRequest) throws NotFoundException {
        userService.withdrawUser(userWithdrawRequest);
        return ResponseEntity.ok().body("withdraw success");
    }

//    @PostMapping("/upload")
//    public ResponseEntity uploadUserImage(@RequestBody UserUploadRequest userUploadRequest) throws NotFoundException {
//        userService.uploadUser(userUploadRequest);
//        return ResponseEntity.ok().body("upload success");
//    }

    @GetMapping("/comments/{id}?page={page}")
    public ResponseEntity getUserComments(@PathVariable("id")int page){
        Page<CommentDto> pages = userService.getUserComments(id, page);
        return ResponseEntity.ok(pages);
    }

//    유저의 NFT 발행 갯수를 체크한다
//    DB에 count 컬럼 추가 필요
//    @GetMapping("/check/{id}")
//    public ResponseEntity checkUserCount(@PathVariable("id") Long id){
//        userService.getUserCount
//        return ResponseEntity.ok().build();
//    }

//    유저의 알람 기능을 끈다
//    DB에 alarm 컬럼 추가 필요
//    @GetMapping("/alarm?state={state}")
//    public ResponseEntity getUserComments(@PathVariable("state") int state) {
//        return ResponseEntity.ok().build();
//    }



}
