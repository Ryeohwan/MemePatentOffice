package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Comment;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CommentRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserSignUpRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserUpdateRequest;
import com.memepatentoffice.mpoffice.domain.user.api.request.UserWithdrawRequest;
import com.memepatentoffice.mpoffice.domain.user.api.response.CommentResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserSignUpResponse;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MemeRepository memeRepository;

    private final CommentRepository commentRepository;

    private User findUser(Long userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId + " : User"));
    }

    @Transactional(readOnly = true)
    public UserResponse getUserInfo(Long userId) throws NotFoundException {
        User user = findUser(userId);
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .walletAddress(user.getWalletAddress())
                .profileImage(user.getProfileImage())
                .build();
        return userResponse;
    }
    @Transactional
    public UserSignUpResponse createUser(final UserSignUpRequest userSignUpRequest) {

        User user = User.builder()
                .id(userSignUpRequest.getId())
                .name(userSignUpRequest.getName())
                .nickname(userSignUpRequest.getNickname())
                .email(userSignUpRequest.getEmail())
                .isValid(userSignUpRequest.getIsValid())
                .walletAddress(userSignUpRequest.getWalletAddress())
                .profileImage(userSignUpRequest.getProfileImage())
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
    public UserResponse updateUser(UserUpdateRequest userUpdateRequest) throws NotFoundException{
        User user = findUser(userUpdateRequest.getId());

        if(userUpdateRequest.getNickname() != null){
            user.setNickname(userUpdateRequest.getNickname());
        }
        if(userUpdateRequest.getProfileImage() != null) {
            user.setProfileImage(userUpdateRequest.getProfileImage());
        }
        user = userRepository.save(user);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .isValid(user.getIsValid())
                .walletAddress(user.getWalletAddress())
                .profileImage(user.getProfileImage())
                .build();

        return userResponse;
    }

    public void withdrawUser(UserWithdrawRequest userWithdrawRequest) throws NotFoundException {
        User user = findUser(userWithdrawRequest.getId());
    }
    @Transactional(readOnly = true)
    public Page<CommentResponse> getUserComments (Long id, int page) {
        PageRequest pageRequest = PageRequest.of(page,8, Sort.by(Sort.Direction.DESC, "id"));
        Page<Comment> pages = commentRepository.findCommentsByUserId(pageRequest);
        Page<CommentResponse> result = pages.map(m -> CommentResponse.builder()
                .updatedAt(LocalDateTime.now())
                .content(m.getContent())
                .createdAt(m.getCreatedAt())
                .parentCommentSeq(m.getParentCommentSeq())
                .isValid(m.getIsValid())
                .memeId(m.getMemeId())
                .userId(m.getUserId())
                .updatedAt(m.getUpdatedAt())
                .build()
        );
        return result;
    }
}