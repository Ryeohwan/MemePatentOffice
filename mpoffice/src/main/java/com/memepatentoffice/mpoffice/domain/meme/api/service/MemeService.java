package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.memepatentoffice.mpoffice.common.Exception.MemeCreateCountException;
import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.*;
import com.memepatentoffice.mpoffice.domain.meme.api.request.CartRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.MemeCreateRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.TransactionRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.request.UserMemeLikeRequest;
import com.memepatentoffice.mpoffice.domain.meme.api.response.*;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.CartRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.TransactionRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.UserMemeLikeRepository;
import com.memepatentoffice.mpoffice.domain.meme.db.repository.MemeRepository;
import com.memepatentoffice.mpoffice.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
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

    private final TransactionRepository transactionRepository;
    @Transactional
    public MemeResponse findByTitle(Long userId, Long memeId)throws NotFoundException{
        //추후 중복검사 로직 추가
        Meme meme = memeRepository.findById(memeId).orElseThrow(() -> new NotFoundException("해당하는 밈이 없습니다."));
        User user = userRepository.findById(userId).orElseThrow(()-> new NotFoundException("해당하는 유저가 없습니다."));
        meme.setSearched();
        String iso = meme.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME);
        MemeResponse result = new MemeResponse().builder()
                .id(meme.getId())
                .content(meme.getContent())
                .createdAt(iso)
                .createrNickname(meme.getCreater().getNickname())
                .ownerNickname(meme.getOwner().getNickname())
                .memeImage(meme.getImageurl())
                .searched(meme.getSearched())
                .situation(meme.getSituation())
                .title(meme.getTitle())
                .likeCount(userMemeLikeRepository.countLikeOrHate(meme.getId(),MemeLike.LIKE))
                .hateCount(userMemeLikeRepository.countLikeOrHate(meme.getId(),MemeLike.HATE))
                .build();
        if(cartRepository.existsUserMemeAuctionAlertByUserIdAndMemeId(user.getId(),meme.getId())){
            result.setCart(cartRepository.findUserMemeAuctionAlertByUserIdAndMemeId(user.getId(),meme.getId()).getCart());
        }
        if(userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(user.getId(),meme.getId())){
            result.setMemeLike(userMemeLikeRepository.findUserMemeLikeByUserIdAndMemeId(user.getId(),meme.getId()).getMemeLike());
        }
        return result;
    }

    public List<MemeResponse> findAll(){
        return memeRepository.findAll().stream()
                .map((meme)->MemeResponse.builder()
                        .id(meme.getId())
                        .content(meme.getContent())
                        .createdAt(meme.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME))
                        .createrNickname(meme.getCreater().getNickname())
                        .ownerNickname(meme.getOwner().getNickname())
                        .title(meme.getTitle())
                        .build()).collect(Collectors.toList());
    }

    @Transactional
    public Long createMeme(MemeCreateRequest memeCreateRequest) throws NotFoundException, MemeCreateCountException{
        User creater = userRepository.findById(memeCreateRequest.getCreaterId())
                .orElseThrow(()->new NotFoundException("존재하지 않는 유저입니다"));

        if(creater.getToday().isBefore(LocalDateTime.now())){
                // 하루가 지났니
                creater.setTodayMemeLike(1);
                creater.setToday(LocalDateTime.now());
        }else{
            if(creater.getTodayMemeCount() < 0){
                throw new MemeCreateCountException("하루 제한 2회를 넘었습니다...");
            }else{
                int count = creater.getTodayMemeCount() -1 ;
                creater.setTodayMemeLike(count);
                creater.setToday(LocalDateTime.now());
            }
        }

        if (creater.getId() > 500 && creater.getId() < 510){
            creater.setTodayMemeLike(100000);
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
    public boolean addMemeLike(UserMemeLikeRequest userMemeLikeRequest) throws Exception {
        Long userId = userMemeLikeRequest.getUserId();
        Long memeId = userMemeLikeRequest.getMemeId();

        // 이미 있으면 좋아요나 싫어요 상태를 바꿔준다.
        if (userMemeLikeRepository.existsUserMemeLikeByUserIdAndMemeId(userId, memeId)) {
            UserMemeLike find = userMemeLikeRepository.findUserMemeLikeByUserIdAndMemeId(userId, memeId);
            if (find.getMemeLike()==null) {
                find.setLike(userMemeLikeRequest.getMemeLike());
                find.setDate(LocalDateTime.now());
                return true;
            }
            if (find.getMemeLike().equals(userMemeLikeRequest.getMemeLike())) {
                find.setLike(null);
                find.setDate(LocalDateTime.now());
                return true;
            }
            find.setLike(userMemeLikeRequest.getMemeLike());
            find.setDate(LocalDateTime.now());
            return true;
        } else {
            // 없으면 새로 만들어준다.
            userMemeLikeRepository.save(
                    UserMemeLike.builder()
                            .user(userRepository.findById(userId)
                                    .orElseThrow(() -> new NotFoundException("유저가 없습니다")))
                            .meme(memeRepository.findById(memeId)
                                    .orElseThrow(() -> new NotFoundException("밈이 없습니다")))
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
            if(seak.getCart() == null){
                seak.setCart(cartRequest.getCart());
            }else{
                seak.setCart(null);
            }
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

    public PriceListResponse priceGraph(Long titleId) throws NotFoundException{
        Meme meme = memeRepository.findById(titleId).orElseThrow(()-> new NotFoundException("해당하는 밈이 없습니다."));
        List<Transaction> en = transactionRepository.findBuyerList(meme.getId());

        List<TransactionResponse> before = new ArrayList<>();
        for(Transaction a : en){
            TransactionResponse temp = TransactionResponse.builder()
                    .nickName(userRepository.findById(a.getBuyerId()).orElseThrow(()->new NotFoundException("유효하지 않은 구매자 입니다.")).getNickname())
                    .price(a.getPrice())
                    .createdAt(a.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            if(a.getPrice()!= 0) before.add(temp);
        }
        if(before.size() > 0){
            List<Double> temp = transactionRepository.PricaRankList(meme.getId());
            Double high = temp.get(0);
            Double low = temp.get(temp.size()-1);
            PriceListResponse result = PriceListResponse.builder()
                    .buyerList(before)
                    .highPrice(high)
                    .lowPrice(low)
                    .build();
            return result;
        }else{
            PriceListResponse result = new PriceListResponse();
            return result;
        }


    }

    @Transactional
    public void addTransaction(TransactionRequest transactionRequest) throws NotFoundException{
        User buyer = userRepository.findById(transactionRequest.getBuyerId()).orElseThrow(()-> new NotFoundException("해당하는 구매자가 없읍니다."));
        userRepository.findById(transactionRequest.getSellerId()).orElseThrow(()-> new NotFoundException("해당하는 판매자가 없읍니다."));
        Meme a = memeRepository.findById(transactionRequest.getMemeId()).orElseThrow(()-> new NotFoundException("해당하는 밈이 없습니다."));

        Transaction transaction = Transaction.builder()
                .buyerId(transactionRequest.getBuyerId())
                .sellerId(transactionRequest.getSellerId())
                .memeId(transactionRequest.getMemeId())
                .price(transactionRequest.getPrice())
                .createdAt(LocalDateTime.parse(transactionRequest.getCreatedAt(),DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
        transactionRepository.save(transaction);
        a.setOwner(buyer);
    }

    public List<MemeListResponse> randomMeme(){
        int check = memeRepository.countAll();
        List<MemeListResponse> result = new ArrayList<>();
        //why
        for (int i = 0; i < 5; i++) {
            int rand = (int)(Math.random()*check)+1;
            Long randNum = Long.valueOf(rand);
            Meme a = memeRepository.findById(randNum).get();
            MemeListResponse temp = MemeListResponse.builder()
                    .description(a.getContent())
                    .example(a.getSituation())
                    .imgUrl(a.getImageurl())
                    .id(a.getId())
                    .nickname(a.getCreater().getNickname())
                    .title(a.getTitle())
                    .build();
            result.add(temp);
        }
        return result;
    }

    public List<MemeListResponse> findMemes(Long userId){
        List<Meme> list = memeRepository.findAllByOwnerIdOrderByCreatedAtDesc(userId);
        List<MemeListResponse> result = new ArrayList<>();
        for(Meme a : list){
            MemeListResponse temp = MemeListResponse.builder()
                    .description(a.getContent())
                    .example(a.getSituation())
                    .imgUrl(a.getOwner().getProfileImage())
                    .id(a.getId())
                    .nickname(a.getOwner().getNickname())
                    .title(a.getTitle())
                    .build();
            result.add(temp);
            System.out.println(temp.getNickname());
        }
        return result;
    }

    public List<MemeListResponse> findLiked(Long userId){
        List<UserMemeLike> all = userMemeLikeRepository.findAllByUserId(userId);
        List<MemeListResponse> result = new ArrayList<>();
        User tempU = userRepository.findById(userId).get();
        System.out.println(tempU.getNickname());
        System.out.println();
        for(UserMemeLike a: all){
            if(a.getMemeLike() != null && a.getMemeLike().equals(MemeLike.LIKE)){
                MemeListResponse temp = MemeListResponse.builder()
                        .description(a.getMeme().getContent())
                        .example(a.getMeme().getSituation())
                        .imgUrl(a.getMeme().getImageurl())
                        .id(a.getMeme().getId())
                        .nickname(a.getUser().getNickname())
                        .userImg(tempU.getProfileImage())
                        .title(a.getMeme().getTitle())
                        .build();
                result.add(temp);
            }
        }
        return result;
    }

    public List<MemeListResponse> findCarted(Long userId){
        List<UserMemeAuctionAlert> all = cartRepository.findAllByUserId(userId);
        User tempU = userRepository.findById(userId).get();
        List<MemeListResponse> result = new ArrayList<>();
        for(UserMemeAuctionAlert a:all){
            if(a.getCart() != null && a.getCart().equals(Cart.ADD)){
                MemeListResponse temp = MemeListResponse.builder()
                        .description(a.getMeme().getContent())
                        .example(a.getMeme().getSituation())
                        .imgUrl(a.getMeme().getImageurl())
                        .id(a.getMeme().getId())
                        .nickname(a.getUser().getNickname())
                        .userImg(tempU.getProfileImage())
                        .title(a.getMeme().getTitle())
                        .build();
                result.add(temp);
            }
        }
        return result;
    }

    public List<MyHistoryList> buyedList(Long userId){
        List<Transaction> list = transactionRepository.findAllByBuyerId(userId);
        List<MyHistoryList> result = new ArrayList<>();
        for(Transaction a : list){
            Meme temp = memeRepository.findById(a.getMemeId()).get();
            User u = userRepository.findById(a.getSellerId()).get();
            MyHistoryList c = MyHistoryList.builder()
                    .id(temp.getId())
                    .title(temp.getTitle())
                    .seller(u.getNickname())
                    .price(a.getPrice())
                    .imgSrc(temp.getImageurl())
                    .date(a.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            result.add(c);
        }
        return result;
    }

    public List<MyHistoryList> selledList(Long userId){
        List<Transaction> list = transactionRepository.findAllBySellerId(userId);
        List<MyHistoryList> result = new ArrayList<>();
        for(Transaction a : list){
            Meme temp = memeRepository.findById(a.getMemeId()).get();
            User u = userRepository.findById(a.getBuyerId()).get();
            MyHistoryList c = MyHistoryList.builder()
                    .id(temp.getId())
                    .title(temp.getTitle())
                    .seller(u.getNickname())
                    .price(a.getPrice())
                    .imgSrc(temp.getImageurl())
                    .date(a.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            result.add(c);
        }
        return result;
    }

    public MemeResponse findById(Long memeId) throws NotFoundException{
        Meme a = memeRepository.findById(memeId).orElseThrow(()-> new NotFoundException("해당하는 밈이 없읍ㄴ디ㅏ...."));

        MemeResponse result = MemeResponse.builder()
                .id(a.getId())
                .memeImage(a.getImageurl())
                .content(a.getContent())
                .createdAt(a.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .searched(a.getSearched())
                .ownerNickname(a.getOwner().getNickname())
                .situation(a.getSituation())
                .title(a.getTitle())
                .build();
        return result;
    }
}
