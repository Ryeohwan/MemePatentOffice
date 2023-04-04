package com.memepatentoffice.auction.api.controller;

import com.memepatentoffice.auction.api.dto.message.WebSocketCharacter;
import com.memepatentoffice.auction.api.dto.request.AuctionCreationReq;
import com.memepatentoffice.auction.api.dto.message.WebSocketChatReq;
import com.memepatentoffice.auction.api.dto.request.BidReq;
import com.memepatentoffice.auction.api.dto.response.AuctionListRes;
import com.memepatentoffice.auction.api.service.AuctionService;
import com.memepatentoffice.auction.api.service.BidService;
import com.memepatentoffice.auction.common.exception.BiddingException;
import com.memepatentoffice.auction.common.exception.NotFoundException;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService auctionService;
    private BidService bidService;
    @ApiOperation(value="경매 리스트", notes = "경매장 리스트를 불러옵니다. sort: popular,latest,oldest")
    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestParam String sort) throws NotFoundException{
        List<AuctionListRes> auctionList = null;
        if("popular".equals(sort)){
            auctionList = auctionService.findAllByHit();
        }
        else if("latest".equals(sort)){
            auctionList = auctionService.findAllProceedingByFinishTimeLatest();
        }
        else if("oldest".equals(sort)){
            auctionList = auctionService.findAllProceedingByFinishTimeOldest();
        }
        return ResponseEntity.status(HttpStatus.OK).body(auctionList);
    }
    @ApiOperation(value="경매 정보", notes = "경매 정보를 리턴합니다.")
    @PostMapping("/info")
    public ResponseEntity<?> getInfo(@RequestParam Long auctionId) throws NotFoundException{
        //TODO
        return null;
    }

    @ApiOperation(value="경매 등록", notes = "경매를 예약합니다. 예약한 시간에 경매가 시작되고, 시작 후 60*24 후에 끝납니다.")
    @PostMapping("/register")
    public ResponseEntity<?> registerAuction(@RequestBody AuctionCreationReq auctionCreationReq) throws IOException, NotFoundException{
        return ResponseEntity.status(HttpStatus.CREATED).body(auctionService.registerAuction(auctionCreationReq));
    }

    @ApiOperation(value="경매 입찰", notes = "경매에 입찰합니다. 현재 호가보다 더 높은 가격으로 시도해야지만 입찰이 됩니다.")
    @GetMapping("/add")
    public ResponseEntity<?> bid(@RequestBody BidReq bidReq) throws NotFoundException, BiddingException {
        return ResponseEntity.status(HttpStatus.OK).body(bidService.bid(bidReq));
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
