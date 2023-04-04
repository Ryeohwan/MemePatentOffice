package com.memepatentoffice.mpoffice.domain.user.api.controller;


import com.memepatentoffice.mpoffice.common.Exception.NotFoundException;
import com.memepatentoffice.mpoffice.db.entity.AlarmType;
import com.memepatentoffice.mpoffice.domain.user.api.response.AlarmCheckResponse;
import com.memepatentoffice.mpoffice.domain.user.api.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/mpoffice/alarm")
@RestController
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/list/{userId}")
    public ResponseEntity getAlarms(
            @PathVariable("userId") Long userId,
            @RequestParam(value = "idx", defaultValue = "0") long Idx,
            @PageableDefault(size = 10, sort="id", direction = Sort.Direction.DESC) Pageable pageable ) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(alarmService.getAlarms(Idx, userId, pageable));
    }

    @GetMapping("/check/{userId}")
    public ResponseEntity checkAlarm (@PathVariable("userId") Long userId){
        AlarmCheckResponse alarmCheckResponse = alarmService.checkAlarmExist(userId);
        return ResponseEntity.status(HttpStatus.OK).body(alarmCheckResponse);
    }

    @GetMapping("/auction/register")
    public ResponseEntity addRegAuctionAlarm(
            @RequestParam(value = "auction") Long auctionId,
            @RequestParam(value = "user") Long userId,
            @RequestParam(value = "meme") Long memeId
    ) throws NotFoundException {
        alarmService.addAlarm(auctionId, userId, memeId, AlarmType.AUCTION_REG);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/auction/start")
    public ResponseEntity addStartAuctionAlarm(
            @RequestParam(value = "auction") Long auctionId,
            @RequestParam(value = "user") Long userId,
            @RequestParam(value = "meme") Long memeId
    ) throws NotFoundException {
        alarmService.addAlarm(auctionId, userId, memeId, AlarmType.AUCTION_START);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/auction/end")
    public ResponseEntity addEndAuctionAlarm(
            @RequestParam(value = "auction") Long auctionId,
            @RequestParam(value = "user") Long userId,
            @RequestParam(value = "meme") Long memeId
    ) throws NotFoundException {
        alarmService.addAlarm(auctionId, userId, memeId, AlarmType.AUCTION_END);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
