package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.User;
import com.memepatentoffice.mpoffice.db.entity.UserMemeLike;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.UserMemeLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.db.entity.Meme;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeLikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class MemeService {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final MemeRepository memeRepository;
    private final UserMemeLikeRepository userMemeLikeRepository;
    private final UserRepository userRepository;

    public MemeResponse findByTitle(String title)throws NotFoundException{
        //추후 중복검사 로직 추가
        Meme meme = memeRepository.findMemeByTitle(title)
                .orElseThrow(()->new NotFoundException("타이틀에 해당하는 밈이 없습니다"));
        MemeResponse result = new MemeResponse().builder()
                .id(meme.getId())
                .content(meme.getContent())
                .createdAt(meme.getCreatedAt())
                .createrId(meme.getCreater().getId())
                .ownerId(meme.getOwner().getId())
                .title(meme.getTitle())
                .build();
        return result;
    }
    public List<MemeResponse> findAll(){
        return memeRepository.findAll().stream()
                .map((meme)->MemeResponse.builder()
                        .id(meme.getId())
                        .content(meme.getContent())
                        .createdAt(meme.getCreatedAt())
                        .createrId(meme.getCreater().getId())
                        .ownerId(meme.getOwner().getId())
                        .title(meme.getTitle())
                        .build()).collect(Collectors.toList());
    }

    @Transactional
    public Long createMeme(MemeCreateRequest memeCreateRequest) throws NotFoundException{
        User creater = userRepository.findById(memeCreateRequest.getCreaterId())
                .orElseThrow(()->new NotFoundException("존재하지 않는 유저입니다"));

        Meme meme = memeRepository.save(memeCreateRequest.toEntity(creater, creater));
        log.info(meme.getTitle());
        return meme.getId();
    }

    public String titleCheck(String title){
        if(memeRepository.existsMemeByTitle(title)){
            return FAIL;
        }
        return SUCCESS;
    }

    @Transactional
    public boolean addMemeLike(UserMemeLikeRequest userMemeLikeRequest) throws Exception{
        Long userId = userMemeLikeRequest.getUserId();
        Long memeId = userMemeLikeRequest.getMemeId();
        log.info("userid: "+userId);
        log.info("memeid: "+memeId);
        log.info("like: "+userMemeLikeRequest.getLike());
        if(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId, memeId)){
            throw new Exception("헐 좋아요 이미 누름");
        }
        userMemeLikeRepository.save(
                UserMemeLike.builder()
                        .user(userRepository.findById(userId)
                                .orElseThrow(()->new NotFoundException("유저가 없습니다")))
                        .meme(memeRepository.findById(memeId)
                                .orElseThrow(()->new NotFoundException("밈이 없습니다")))
                        .like(userMemeLikeRequest.getLike())
                        .build()
        );
        return true;
    }
}
