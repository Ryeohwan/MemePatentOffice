package com.memepatentoffice.mpoffice.domain.meme.api.service;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.memepatentoffice.mpoffice.domain.meme.api.response.AuctionDto;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionCommunication {
    private OkHttpClient client = new OkHttpClient();

    @Value("${app.business.url}")
    private String SERVER_URL;

    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
        @Override
        public JsonElement serialize(LocalDateTime src, Type typeOfSrc, JsonSerializationContext context) {
            return new JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        }

    }).registerTypeAdapter(LocalDateTime.class,  new JsonDeserializer<LocalDateTime>(){
        @Override
        public LocalDateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            return LocalDateTime.parse(json.getAsString(),
                    DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
        }
    }).create();


    public List<AuctionDto> getAuctions(Long id) {

        String userId = id.toString();

        AuctionDto bdto = new AuctionDto();

        String json = gson.toJson(bdto);

        RequestBody requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
        Request request = new Request.Builder()
                .url(SERVER_URL+"/list")
                .build();

        Type type = new TypeToken<List<AuctionDto>>() {}.getType();

        List<AuctionDto> list = new ArrayList<>();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()){
                String st = response.body().string();
                list = gson.fromJson(st,type);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return list;
    }
}
