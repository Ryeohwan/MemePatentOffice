package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.MemeCreateCountException;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CartRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeInfoRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.UserMemeLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CartRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeLikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    private final CartRepository cartRepository;
    @Transactional
    public MemeResponse findByTitle(Long userId, Long memeId)throws NotFoundException{
        //추후 중복검사 로직 추가
        Meme meme = memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException("해당하는 밈이 없습니다."));
        User user = userRepository.findById(userId).orElseThrow(()-> new NotFoundException("해당하는 유저가 없습니다."));
        meme.setSearched();
        MemeResponse result = new MemeResponse().builder()
                .id(meme.getId())
                .content(meme.getContent())
                .createdAt(meme.getCreatedAt())
                .createrNickname(meme.getCreater().getNickname())
                .ownerNickname(meme.getOwner().getNickname())
                .memeImage(meme.getImageurl())
                .searched(meme.getSearched())
                .situation(meme.getSituation())
                .title(meme.getTitle())
                .likeCount(userMemeLikeRepository.countLike(userId,meme.getId(),MemeLike.LIKE))
                .hateCount(userMemeLikeRepository.countLike(userId,meme.getId(),MemeLike.HATE))
                .build();
        if(cartRepository.existsUserMemeAuctionAlertByUserIdAndMemeId(userId,meme.getId())){
            result.setCart(cartRepository.findUserMemeAuctionAlertByUserIdAndMemeId(userId,meme.getId()).getCart());
        }
        if(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId,meme.getId())){
            result.setMemeLike(userMemeLikeRepository.findUserMemeLikeByUserIdAndMemeId(userId,meme.getId()).getMemeLike());
        }
        return result;
    }

    public List<MemeResponse> findAll(){
        return memeRepository.findAll().stream()
                .map((meme)->MemeResponse.builder()
                        .id(meme.getId())
                        .content(meme.getContent())
                        .createdAt(meme.getCreatedAt())
                        .createrNickname(meme.getCreater().getNickname())
                        .ownerNickname(meme.getOwner().getNickname())
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
        Meme meme1 = memeRepository.findMemeByTitle(meme.getTitle()).orElseThrow(()->new NotFoundException("없네요"));

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

        // 이미 있으면 좋아요나 싫어요 상태를 바꿔준다.
        if(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId, memeId)){
            UserMemeLike find = userMemeLikeRepository.findUserMemeLikeByUserIdAndMemeId(userId,memeId);
            find.setLike(userMemeLikeRequest.getMemeLike());
            find.setDate(LocalDateTime.now());
            return true;
        }else{
            // 없으면 새로 만들어준다.
            userMemeLikeRepository.save(
                    UserMemeLike.builder()
                            .user(userRepository.findById(userId)
                                    .orElseThrow(()->new NotFoundException("유저가 없습니다")))
                            .meme(memeRepository.findById(memeId)
                                    .orElseThrow(()->new NotFoundException("밈이 없습니다")))
                            .memeLike(userMemeLikeRequest.getMemeLike())
                            .date(LocalDateTime.now())
                            .build()
            );
            return true;
        }


    }

    
    // 찜하기
    @Transactional
    public boolean addCart(CartRequest cartRequest) throws Exception{
        log.info("여기 오긴 하니?");
        Long userId = cartRequest.getUserId();
        Long memeId = cartRequest.getMemeId();
        log.info("userid: "+userId);
        log.info("memeid: "+memeId);
        log.info("add or: "+cartRequest.getCart());
        if(cartRepository.existsUserMemeAuctionAlertByUserIdAndMemeId(userId,memeId)){
            log.info("이미 존재하는 알람 정보를 수정합니다.");
            UserMemeAuctionAlert seak = cartRepository.findUserMemeAuctionAlertByUserIdAndMemeId(
                    userRepository.findById(userId)
                            .orElseThrow(()-> new NotFoundException("유저가 없습니다.")).getId()
                    ,memeRepository.findById(memeId)
                            .orElseThrow(() -> new NotFoundException("밈이 없습니다.")).getId());
            seak.setCart(cartRequest.getCart());
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

    public Long totalCount(){
        Long totalCount = memeRepository.count();
        return totalCount;
    }

    public void priceGraph(String title){

    }

}
