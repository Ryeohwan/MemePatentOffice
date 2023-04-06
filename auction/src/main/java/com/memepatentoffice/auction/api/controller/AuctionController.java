package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.dto.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.dto.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.dto.request.BidReq;
import com.memepatentoffice.auction.api.dto.response.AuctionListRes;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.common.exception.AuctionException;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
@Slf4j
public class AuctionController {
    private final AuctionService auctionService;
    @ApiOperation(value="경매 리스트", notes = "경매장 리스트를 불러옵니다. sort: popular,latest,oldest")
    @GetMapping(value = "/list",params={"sort"})
    public ResponseEntity<?> getList(@RequestParam String sort) throws NotFoundException {
            List<AuctionListRes> auctionList = null;
            if ("popular".equals(sort)) {
                auctionList = auctionService.findAllByHit();
            } else if ("latest".equals(sort)) {
                auctionList = auctionService.findAllProceedingByFinishTimeLatest();
            } else if ("oldest".equals(sort)) {
                auctionList = auctionService.findAllProceedingByFinishTimeOldest();
            }
            return ResponseEntity.status(HttpStatus.OK).body(auctionList);
    }

    @ApiOperation(value="유저의 경매 리스트", notes = "유저가 실시했던 경매 리스트를 불러옵니다.")
    @GetMapping(value = "/list",params={"userNickname"})
    public ResponseEntity<?> getListByUserNickname(@RequestParam String userNickname) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(
                auctionService.findAllBySellerNickname(userNickname)
        );
    }

    @ApiOperation(value="경매 정보", notes = "경매 정보를 리턴합니다.")
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(@RequestParam Long auctionId) throws Exception{
        return ResponseEntity.status(HttpStatus.OK).body(auctionService.getInfo(auctionId));
    }

    @ApiOperation(value="캐러셀에 띄울 경매 리스트", notes= "캐러셀에 띄울 경매 정보 5개입니다.")
    @GetMapping("/carousel")
    public ResponseEntity<?> getListForCarousel(){
        return ResponseEntity.status(HttpStatus.OK).body(auctionService.getListForCarousel());
    }

    @ApiOperation(value="경매 등록", notes = "경매를 예약합니다. 예약한 시간에 경매가 시작되고, 시작 후 60*24 후에 끝납니다.")
    @PostMapping("/register")
    public ResponseEntity<?> registerAuction(@RequestBody AuctionCreationReq auctionCreationReq) throws IOException, NotFoundException, AuctionException {
        log.info("now(): "+ LocalDateTime.now());
        log.info(auctionCreationReq.getStartDateTime().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(auctionService.registerAuction(auctionCreationReq));
    }

    @ApiOperation(value="경매 입찰", notes = "경매에 입찰합니다. 현재 호가보다 더 높은 가격으로 시도해야지만 입찰이 됩니다.")
    @PostMapping("/add")
    public ResponseEntity<?> bid(@RequestBody BidReq bidReq) throws NotFoundException, BiddingException {
        return ResponseEntity.status(HttpStatus.OK).body(auctionService.bid(bidReq));
    }
    @ApiOperation(value="밈 아이디로 경매 상태 검색")
    @GetMapping("/search")
    public ResponseEntity<?> searchByMemeId(@RequestParam Long memeId){
        return ResponseEntity.status(HttpStatus.OK).body(auctionService.searchByMemeId(memeId));
    }
    @ApiOperation(value="프론트에서 호출하기 위한 경매 결과")
    @GetMapping("/result")
    public ResponseEntity<?> getResult(@RequestParam Long auctionId) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(auctionService.getResultById(auctionId));
    }

    @MessageMapping("/chat")
    public void sendChat(WebSocketChatReq req){
        auctionService.sendChat(req);
    }

    @MessageMapping("/character")
    public void sendCharacter(WebSocketCharacter dto){
        auctionService.sendCharacter(dto);
    }
}
