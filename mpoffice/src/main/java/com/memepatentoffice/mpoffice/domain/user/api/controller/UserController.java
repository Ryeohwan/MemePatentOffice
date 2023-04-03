package com.memepatentoffice.mpoffice.domain.user.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.common.Exception.UserAlreadyExistsException;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import com.memepatentoffice.mpoffice.domain.user.api.request.SocialRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserSignUpRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserUpdateRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserWithdrawRequest;
import com.memepatentoffice.mpoffice.domain.user.api.response.CountResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.SignUpResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserSignUpResponse;
import com.memepatentoffice.mpoffice.domain.user.api.service.UserService;
import com.sun.xml.bind.v2.model.core.ID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("api/mpoffice/user")
@RestController
public class UserController {
    private final GcpService gcpService;
    private final UserService userService;

//    @ApiResponse(responseCode = "200", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = UserSignUpResponse.class)))
//    @Operation(description = "회원가입 API", summary = "회원가입 API")
    @PostMapping("/signup")
    public ResponseEntity createUser(@RequestBody UserSignUpRequest userSignUpRequest) {
        UserSignUpResponse userSignUpResponse = userService.createUser(userSignUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userSignUpResponse);
    }

//    @PostMapping("/signupList")
//    @ResponseBody
//    public ResponseEntity createUserList(@RequestBody List<UserSignUpRequest> list) {
//        for(UserSignUpRequest a : list){
//            userService.createUser(a);
//        }
//        return ResponseEntity.status(HttpStatus.CREATED).body("finish");
//    }

//    @ApiResponse(responseCode = "200", description = "회원정보 조회 성공", content = @Content(schema = @Schema(implementation = UserResponse.class)))
//    @ApiResponse(responseCode = "404", description = "회원정보 조회 실패")
//    @Operation(description = "회원정보 조회 API", summary = "회원정보 조회 API")
    @GetMapping("/info/{id}")
    public ResponseEntity getUser(@PathVariable("id") Long id) throws NotFoundException {
        UserResponse userResponse = userService.getUserInfo(id);
        return ResponseEntity.ok().body(userResponse);
    }

    @GetMapping("/emailCheck/{email}")
    public ResponseEntity emailCheck(@PathVariable("email") String email) {
        Boolean emailChecked = userService.emailDuplicatedCheck(email);
        return ResponseEntity.status(HttpStatus.OK).body(emailChecked);
    }

    @GetMapping("/nickName/{nickName}")
    public ResponseEntity nickNameCheck(@PathVariable("nickName") String nickName) {
        Boolean nickNameChecked = userService.nickNameDuplicatedCheck(nickName);
        return ResponseEntity.status(HttpStatus.OK).body(nickNameChecked);
    }

//    @ApiResponse(responseCode = "200", description = "회원정보 수정 성공", content = @Content(schema = @Schema(implementation = UserResponse.class)))
//    @ApiResponse(responseCode = "404", description = "회원정보 수정 실패")
//    @Operation(description = "회원정보 수정 API", summary = "회원정보 수정 API")
    @PostMapping("/update")
    @ResponseBody
    public ResponseEntity updateUser(@RequestBody UserUpdateRequest userUpdateRequest) throws NotFoundException, IOException {
        Long id = userService.updateUser(userUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }

    @PostMapping("/withdraw")
    @ResponseBody
    public ResponseEntity withdrawUser(@RequestBody UserWithdrawRequest userWithdrawRequest) throws NotFoundException {
        userService.withdrawUser(userWithdrawRequest);
        return ResponseEntity.status(HttpStatus.OK).body("withdraw success");
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity checkCount(@PathVariable("nickname") String nickname) throws NotFoundException {
        Boolean result = userService.userCount(nickname);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @GetMapping("/comments/{id}?page={page}")
//    public ResponseEntity getUserComments(Long id, int page){
//        Page<CommentResponse> pages = userService.getUserComments(id,page);
//        return ResponseEntity.ok().body(pages);
//    }


//    유저의 알람 기능을 끈다
//    DB에 alarm 컬럼 추가 필요
//    @GetMapping("/alarm?state={state}")
//    public ResponseEntity getUserComments(@PathVariable("state") int state) {
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/server/{email}")
    public ResponseEntity seakId(@PathVariable("email") String email) throws NotFoundException{
        return ResponseEntity.status(HttpStatus.OK).body(userService.seakId(email));
    }

    @PostMapping("/server/signup")
    @ResponseBody
    public ResponseEntity socialSignup (@RequestBody SocialRequest socialRequest) throws UserAlreadyExistsException{
        if(userService.emailDuplicatedCheck(socialRequest.getEmail())){
            SignUpResponse result = userService.socialSignup(socialRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }else {
            throw new UserAlreadyExistsException("EmailAlreadyExists");
        }
    }
}
