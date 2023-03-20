package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.domain.meme.api.request.LikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.LikeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.LikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    public LikeResponse memeLike(LikeRequest like) throws NotFoundException {
        UserMemeLike ulike = UserMemeLike.builder()
                .memeSeq(memeRepository.findMemeById(like.getMeme().getId()))
                .userSeq(userRepository.findUserById(like.getUser().getId()))
                .build();
        UserMemeLike temp = likeRepository.save(ulike);
        LikeResponse result = new LikeResponse();
        result.setMeme(temp.getMemeSeq());
        result.setUser(temp.getUserSeq());
        result.setId(temp.getId());
        return result;
    }

    /**
     *
     * MemeResponse result = new MemeResponse();
     *         result.setCreatedAt(meme.getCreatedAt());
     *         result.setId(meme.getId());
     *         result.setCreaterId(meme.getCreaterId());
     *         result.setOwnerId(meme.getOwnerId());
     *         result.setTitle(meme.getTitle());
     *         result.setContent(meme.getContent());
     *
     * **/
}
