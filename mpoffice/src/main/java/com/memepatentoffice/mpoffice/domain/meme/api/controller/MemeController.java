package com.memepatentoffice.mpoffice.domain.meme.api.controller;

import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.domain.meme.api.request.*;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.response.PriceListResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import com.memepatentoffice.mpoffice.domain.meme.api.service.GcpService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/api/mpoffice/meme")
@RestController
public class MemeController {
    private final MemeService memeService;
    private final GcpService gcpService;
    @GetMapping("/")
    public ResponseEntity<?> getAllMemes(){
        return ResponseEntity.status(HttpStatus.OK).body(
                memeService.findAll()
        );
    }
    @GetMapping("/info")
    public ResponseEntity getMeme(@RequestParam(name = "userId")Long userId, @RequestParam(name = "memeId")Long memeId) throws NotFoundException {
        MemeResponse result = memeService.findByTitle(userId,memeId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping("/check/{title}")
    public ResponseEntity titleDuplicatedCheck(@PathVariable String title){
        String result = memeService.titleCheck(title);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createMeme(@RequestPart MemeCreateRequest memeCreateRequest, @RequestParam MultipartFile uploadFile) throws Exception{
        if( memeService.titleCheck(memeCreateRequest.getTitle()).equals("fail")){
            return ResponseEntity.ok().body("Title is already exist");
        }
        String img = gcpService.uploadFile(uploadFile);
        memeCreateRequest.setImageUrl(img);
        Long id = memeService.createMeme(memeCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }
    @PostMapping("/createList")
    @ResponseBody
    public ResponseEntity createMemeList(@RequestBody List<MemeCreateListRequest> list) throws Exception{
        for(MemeCreateListRequest a: list){
            a.setImageUrl(a.getImageUrl());

            MemeCreateRequest result = MemeCreateRequest.builder()
                    .content(a.getContent())
                    .createrId(a.getCreaterId())
                    .imageUrl(a.getImageUrl())
                    .ownerId(a.getCreaterId())
                    .situation(a.getSituation())
                    .title(a.getTitle())
                    .build();
            memeService.createMeme(result);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Meme_dummy_finish");
    }
    @PostMapping("/like")
    @ResponseBody
    public ResponseEntity<?> createLike(@RequestBody UserMemeLikeRequest userMemeLikeRequest) throws Exception {
        memeService.addMemeLike(userMemeLikeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userMemeLikeRequest.getMemeLike());
    }
    @PostMapping("/cart")
    @ResponseBody
    public ResponseEntity cart(@RequestBody CartRequest cartRequest) throws Exception {
        memeService.addCart(cartRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Done");
    }

    @GetMapping("/total")
    public ResponseEntity total(){
        Long result = memeService.totalCount();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/price")
    public ResponseEntity tradeGraph(@RequestParam(name = "title")String title) throws NotFoundException{
        PriceListResponse result = memeService.priceGraph(title);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/addTransaction")
    @ResponseBody
    public ResponseEntity addTransaction(@RequestBody TransactionRequest transactionRequest)throws NotFoundException {
        memeService.addTransaction(transactionRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Okay");
    }

    @GetMapping("/random")
    public ResponseEntity getRandom(){
        return ResponseEntity.status(HttpStatus.OK).body("memeService.randomMeme()ww");
    }

    @GetMapping("/memeList")
    public ResponseEntity getMemeList(@RequestParam Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(memeService.findMemes(userId));
    }

    @GetMapping("/likedMeme")
    public ResponseEntity getLikedMeme(@RequestParam Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(memeService.findLiked(userId));
    }

    @GetMapping("/getCarted")
    public ResponseEntity getCartedMeme(@RequestParam Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(memeService.findCarted(userId));
    }

    @GetMapping("/buyedMeme")
    public ResponseEntity getBuyedMeme(@RequestParam Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(memeService.buyedList(userId));
    }

    @GetMapping("/selledMeme")
    public ResponseEntity getSelledMeme(@RequestParam Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(memeService.selledList(userId));
    }
}
