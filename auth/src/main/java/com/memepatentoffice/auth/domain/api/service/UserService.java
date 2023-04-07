package com.memepatentoffice.auth.domain.api.service;

import com.google.gson.*;
import com.memepatentoffice.auth.domain.api.request.EmailRequest;
import com.memepatentoffice.auth.domain.api.request.UserRequest;
import com.memepatentoffice.auth.domain.api.response.IdResponse;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@Slf4j
public class UserService {

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Value("${app.server.user}")
    public String USER_SERVER_URL;

    private OkHttpClient client = new OkHttpClient();

    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new JsonSerializer<LocalDate>() {
        @Override
        public JsonElement serialize(LocalDate src, Type typeOfSrc, JsonSerializationContext context) {
            return new JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE));
        }

    }).registerTypeAdapter(LocalDate.class,  new JsonDeserializer<LocalDate>(){
        @Override
        public LocalDate deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            return LocalDate.parse(json.getAsString(),
                    DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        }

    }).create();


    public IdResponse getId(EmailRequest emailRequest) {
        String emailJson = gson.toJson(emailRequest);

        RequestBody requestBody = RequestBody.create(JSON, emailJson);
        Request request = new Request.Builder()
                .url(USER_SERVER_URL +"/user/server/" + emailRequest.getEmail())
                .get()
                .build();

        IdResponse idResponse = new IdResponse();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()){
                log.error("유저 아이디가 없습니다");
                idResponse.setId(null);
            }else{
                String st = response.body().string();
                log.info("유저 아이디를 찾았습니다");
                idResponse = gson.fromJson(st, IdResponse.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return idResponse;
    }

    public IdResponse registUser(UserRequest userRequest) {
        String userJson = gson.toJson(userRequest);

        RequestBody requestBody = RequestBody.create(JSON, userJson);
        Request request = new Request.Builder()
                .url(USER_SERVER_URL +"/user/server/signup")
                .post(requestBody)
                .build();

        IdResponse idResponse = new IdResponse();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()){
                log.error("유저 서버간 통신에 실패했습니다");
                idResponse.setId(null);
            }else{
                String st = response.body().string();
                log.info("유저 서버간 통신에 성공했습니다");
                idResponse = gson.fromJson(st, IdResponse.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return idResponse;
    }


}
