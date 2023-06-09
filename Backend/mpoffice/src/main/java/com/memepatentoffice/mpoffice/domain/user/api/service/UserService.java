package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.IsValid;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import com.memepatentoffice.mpoffice.domain.user.api.request.*;
import com.memepatentoffice.mpoffice.domain.user.api.response.*;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private  final GcpService gcpService;
    private User findUser(Long userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User"));
    }

    public Boolean emailDuplicatedCheck(String email){
        if(userRepository.existsByEmail(email)){
            return false;
        }else {
            return true;
        }
    }

    public Boolean nickNameDuplicatedCheck(String nickName){
        if(userRepository.existsByNickname(nickName)){
            return false;
        }else {
            return true;
        }
    }

    public UserResponse getUserInfo(Long userId) throws NotFoundException {
        return new UserResponse(userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("해당 유저가 없습니다.")));
    }
    @Transactional
    public UserSignUpResponse createUser(final UserSignUpRequest userSignUpRequest) {

        User user = User.builder()
                .name(userSignUpRequest.getName())
                .nickname(userSignUpRequest.getNickname())
                .email(userSignUpRequest.getEmail())
                .profileImage(userSignUpRequest.getProfileImage())
                .today(LocalDateTime.now())
                .isValid(IsValid.VALID)
                .todayMemeCount(2)
                .build();

        user = userRepository.save(user);

        UserSignUpResponse userSignUpResponse = UserSignUpResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .isValid(user.getIsValid())
                .walletAddress(user.getWalletAddress())
                .profileImage(user.getProfileImage())
                .build();

        return userSignUpResponse;
    }

    @Transactional
    public Long updateUser(UserUpdateRequest userUpdateRequest) throws NotFoundException {
        User user = userRepository.findById(userUpdateRequest.getId())
                .orElseThrow(()-> new NotFoundException("해당하는 유저가 없습니다."));
        if(userUpdateRequest.getNickname() != null){
            user.setNickname(userUpdateRequest.getNickname());
        }
        if(userUpdateRequest.getUserImage() != null) {
            user.setProfileImage(userUpdateRequest.getUserImage());
        }
        return user.getId();
    }
    @Transactional
    public void withdrawUser(UserWithdrawRequest userWithdrawRequest) throws NotFoundException {
        User user = userRepository.findById(userWithdrawRequest.getUserId())
                .orElseThrow(()->new NotFoundException("해당하는 유저가 없읍니다.."));
        userRepository.delete(user);
    }

    public Boolean userCount(String nickName) throws NotFoundException{
        User user = userRepository.findUserByNickname(nickName).orElseThrow(
                ()-> new NotFoundException("해당 유저를 찾을 수 없읍니다."));
        CountResponse result = CountResponse.builder()
                .count(user.getTodayMemeCount())
                .today(user.getToday())
                .build();
        Boolean fin = true;
        if(result.getCount() > 0){
            return true;
        }else {
            return false;
        }
    }

    public IdFoundResponse seakId(String email) throws NotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("해당하는 유저가 없읍니다."));
        IdFoundResponse result = IdFoundResponse.builder()
                .id(user.getId())
                .build();
        return result;

    }
    @Transactional
    public SignUpResponse socialSignup(SocialRequest social){
        User user = User.builder()
                .nickname(social.getNickname())
                .email(social.getEmail())
                .profileImage("https://storage.googleapis.com/mpoffice/Logo.png")
                .today(LocalDateTime.now())
                .isValid(IsValid.VALID)
                .todayMemeCount(2)
                .build();
        userRepository.save(user);
        SignUpResponse result = SignUpResponse.builder()
                .id(user.getId())
                .build();
        return result;
    }

    @Transactional
    public Long updateUserWallet(UserWalletUpdateRequest userWalletUpdateRequest) throws NotFoundException {
        User user = userRepository.findById(userWalletUpdateRequest.getUserId())
                .orElseThrow(()->new NotFoundException("해당하는 유저가 없읍니다.."));
        user.setWalletAddress(userWalletUpdateRequest.getWalletAddress());
        return user.getId();
    }
//    public Page<CommentResponse> getUserComments (Long id, int page) {
//        PageRequest pageRequest = PageRequest.of(page,8, Sort.by(Sort.Direction.DESC, "id"));
//        List<Comment> pages = commentRepository.findCommentsByUserId(id);
//        List<CommentResponse> result = new ArrayList<>();
//        for(Comment a : pages){
//            CommentResponse temp = new CommentResponse().builder()
//                    .updatedAt(a.getUpdatedAt())
//                    .userId(a.getUserId())
//                    .content(a.getContent())
//                    .memeId(a.getMemeId())
//                    .isValid(a.getIsValid())
//                    .parentCommentSeq(a.getParentCommentId())
//                    .id(a.getId())
//                    .createdAt(a.getCreatedAt())
//                    .build();
//            result.add(temp);
//        }
//        int start = (int) pageRequest.getOffset();
//        int end  = (start + pageRequest.getPageSize()) > result.size() ? result.size() : (start + pageRequest.getPageSize());
//        Page<CommentResponse> resultPage = new PageImpl<>(result.subList(start,end), pageRequest, result.size());
//
//        return resultPage;
//    }




}
