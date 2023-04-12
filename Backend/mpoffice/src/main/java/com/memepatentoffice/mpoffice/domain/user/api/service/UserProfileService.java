package com.memepatentoffice.mpoffice.domain.user.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeListResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserImageResponse;
import com.memepatentoffice.mpoffice.domain.user.api.response.UserMemeResponse;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserProfileService {

    private final UserRepository userRepository;

    private final MemeRepository memeRepository;
    public User getUserImage(String nickname) throws NotFoundException {
        return userRepository.findUserByNickname(nickname).orElseThrow(() -> new NotFoundException(nickname + " : User"));
    }

    public List<UserMemeResponse> getUserMemeList(String nickname) throws NotFoundException {
        User user = userRepository.findUserByNickname(nickname).orElseThrow(() -> new NotFoundException(nickname + " : User"));
        List<Meme> list = memeRepository.findAllByOwnerIdOrderByCreatedAtDesc(user.getId());

        List<UserMemeResponse> result = new ArrayList<>();

        for(Meme m : list){
            UserMemeResponse temp = UserMemeResponse.builder()
                    .id(m.getId())
                    .nickname(m.getOwner().getNickname())
                    .title(m.getTitle())
                    .imgUrl(m.getImageurl())
                    .description(m.getContent())
                    .example(m.getSituation())
                    .userImg(m.getOwner().getProfileImage())
                    .build();

            result.add(temp);
        }
        return result;
    }
}
