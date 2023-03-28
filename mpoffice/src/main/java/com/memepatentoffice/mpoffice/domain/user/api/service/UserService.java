package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.IsValid;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserSignUpRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserUpdateRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserWithdrawRequest;
import com.memepatentoffice.mpoffice.domain.user.api.response.CountResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserSignUpResponse;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private User findUser(Long userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User"));
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
    public Long updateUser(UserUpdateRequest userUpdateRequest) throws NotFoundException{
        User user = userRepository.findById(userUpdateRequest.getId())
                .orElseThrow(()-> new NotFoundException("해당하는 유저가 없습니다."));
        if(userUpdateRequest.getNickname() != null){
            user.setNickname(userUpdateRequest.getNickname());
        }
        if(userUpdateRequest.getProfileImage() != null) {
            user.setProfileImage(userUpdateRequest.getProfileImage());
        }
        return user.getId();
    }
    @Transactional
    public void withdrawUser(UserWithdrawRequest userWithdrawRequest) throws NotFoundException {
        User user = userRepository.findById(userWithdrawRequest.getId())
                .orElseThrow(()->new NotFoundException("해당하는 유저가 없읍니다.."));
        user.setWithdrawalReason(userWithdrawRequest.getWithdrawalReason());
        user.setIsValid(IsValid.InVALID);
    }

    public CountResponse userCount(Long id) throws NotFoundException{
        User user = userRepository.findById(id).orElseThrow(
                ()-> new NotFoundException("해당 유저를 찾을 수 없읍니다."));
        CountResponse result = CountResponse.builder()
                .count(user.getTodayMemeCount())
                .today(user.getToday())
                .build();
        return result;
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
