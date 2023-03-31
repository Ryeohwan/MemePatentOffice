package com.memepatentoffice.mpoffice.domain.meme.api.request;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class TransactionRequest {
    private Long memeId;
    private Long buyerId;
    private Long sellerId;
//    Gson gson = new GsonBuilder()
//            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer())
//            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeDeserializer())
//            .create();
//
//    // LocalDateTime을 JSON 문자열로 직렬화
//    LocalDateTime now = LocalDateTime.now();
//    String json = gson.toJson(now);
//        System.out.println(json);
//
//    // JSON 문자열을 LocalDateTime으로 역직렬화
//    LocalDateTime parsedDateTime = gson.fromJson(json, LocalDateTime.class);
//        System.out.println(parsedDateTime);
    private LocalDateTime createdAt;
    private Double price;
}
