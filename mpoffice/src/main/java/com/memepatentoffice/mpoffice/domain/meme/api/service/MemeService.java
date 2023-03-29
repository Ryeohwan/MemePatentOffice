package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.MemeCreateCountException;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CartRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.UserMemeLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CartRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeLikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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

    private final CartRepository cartRepository;

    public MemeResponse findByTitle(String title)throws NotFoundException{
        //추후 중복검사 로직 추가
        Meme meme = memeRepository.findMemeByTitle(title).orElseThrow(() -> new NotFoundException("해당하는 밈이 없습니다."));
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
    public Long createMeme(MemeCreateRequest memeCreateRequest) throws NotFoundException, MemeCreateCountException{
        User creater = userRepository.findById(memeCreateRequest.getCreaterId())
                .orElseThrow(()->new NotFoundException("존재하지 않는 유저입니다"));

        if(creater.getToday().getDayOfMonth() < LocalDateTime.now().getDayOfMonth()){
                creater.setTodayMemeLike(1);
                creater.setToday(LocalDateTime.now());
        }else{
            if(creater.getTodayMemeCount() < 1){
                throw new MemeCreateCountException("하루 제한 2회를 넘었습니다...");
            }else{
                int count = creater.getTodayMemeCount() -1 ;
                creater.setTodayMemeLike(count);
            }
        }

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

        // 이미 있으면 좋아요나 싫어요 상태를 바꿔준다.
        if(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId, memeId)){
            UserMemeLike find = userMemeLikeRepository.findUserMemeLikeByUserIdAndMemeId(userId,memeId);
            find.setLike(userMemeLikeRequest.getLike());
            find.setDate(userMemeLikeRequest.getDate());
            return true;
        }else{
            // 없으면 새로 만들어준다.
            userMemeLikeRepository.save(
                    UserMemeLike.builder()
                            .user(userRepository.findById(userId)
                                    .orElseThrow(()->new NotFoundException("유저가 없습니다")))
                            .meme(memeRepository.findById(memeId)
                                    .orElseThrow(()->new NotFoundException("밈이 없습니다")))
                            .like(userMemeLikeRequest.getLike())
                            .date(LocalDateTime.now())
                            .build()
            );
            return true;
        }


    }

    
    // 찜하기
    @Transactional
    public boolean addCart(CartRequest cartRequest) throws Exception{
        Long userId = cartRequest.getUserId();
        Long memeId = cartRequest.getMemeId();
        log.info("userid: "+userId);
        log.info("memeid: "+memeId);
        log.info("add or: "+cartRequest.getCart());

        if(cartRepository.existsUserMemeAuctionAlertByUserAndMeme(userId,memeId)){
            UserMemeAuctionAlert find = cartRepository.findUserMemeAuctionAlertByUserAndMeme(
                    userRepository.findById(userId)
                            .orElseThrow(()-> new NotFoundException("유저가 없습니다."))
                    ,memeRepository.findById(memeId)
                            .orElseThrow(() -> new NotFoundException("밈이 없습니다.")));
            find.setCart(cartRequest.getCart());
        }else{
            cartRepository.save(
                    UserMemeAuctionAlert.builder()
                            .user(userRepository.findById(userId)
                                    .orElseThrow(()->new NotFoundException("유저가 없습니다")))
                            .meme(memeRepository.findById(memeId)
                                    .orElseThrow(()->new NotFoundException("밈이 없습니다")))
                            .cart(cartRequest.getCart())
                            .build()
            );
        }

        return true;
    }
}
