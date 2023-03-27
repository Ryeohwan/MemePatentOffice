package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLikeId;
import com.memepatentoffice.mpoffice.db.entity.like;
import com.memepatentoffice.mpoffice.domain.meme.api.request.LikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.LikeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.LikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemeService {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final MemeRepository memeRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    public MemeResponse findByTitle(String title){
        Meme meme = memeRepository.findMemeByTitle(title);
        MemeResponse result = new MemeResponse().builder()
                .id(meme.getId())
                .content(meme.getContent())
                .createdAt(meme.getCreatedAt())
                .createrId(meme.getCreaterId())
                .ownerId(meme.getOwnerId())
                .title(meme.getTitle())
                .build();
        return result;
    }

    @Transactional
    public String createMeme(MemeCreateRequest memeCreateRequest){
        Meme meme = memeRepository.save(memeCreateRequest.toEntity());
        if(meme.getTitle() == null){
            return FAIL;
        }
        System.out.println(meme.getTitle());
        return SUCCESS;
    }

    public String titleCheck(String title){
        if(memeRepository.existsMemeByTitle(title)){
            return FAIL;
        }
        return SUCCESS;
    }

    @Transactional
    public LikeResponse memeLike(LikeRequest lrequest) throws NotFoundException {
        UserMemeLikeId umi = new UserMemeLikeId();
        umi.setMeme(lrequest.getMeme());
        umi.setUser(lrequest.getUser());
        if(lrequest.getLike() == like.LIKE){
            lrequest.setLike(like.LIKE);
        }else{
            lrequest.setLike(like.HATE);
        }
        UserMemeLike ulike = UserMemeLike.builder()
                .meme(memeRepository.findMemeById(umi.getMeme()))
                .user(userRepository.findUserById(umi.getUser()))
                .like(lrequest.getLike())
                .build();

        UserMemeLike temp = likeRepository.save(ulike);
        LikeResponse result = LikeResponse.builder()
                .meme(temp.getMeme())
                .user(temp.getUser())
                .like(temp.getLike())
                .build();
        return result;
    }
}
