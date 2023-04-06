package com.memepatentoffice.auction.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.memepatentoffice.auction.api.dto.AuctionClosing;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
public class InterServiceCommunicationProvider {
    //TODO: baseUrl을 생성자 파라미터로 받기 위해 팩토리로 만들기
    private final String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    public Optional<JSONObject> getRequestToUrl(String url){
        Request request = new Request.Builder()
                .url(url)
                .build();
        try(Response response = client.newCall(request).execute()){
            if(response.isSuccessful()){
                String respBody = response.body().string();
                log.info(respBody);
                return Optional.of(new JSONObject(respBody));
            }
            else{
                log.error("InterServiceCommunicationProvider returned "+response.code()+" by "+url);
                return Optional.empty();
            }
        }catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }

    public Optional<String> postRequestToUrl(String url, Object o) throws JsonProcessingException {
        RequestBody body = RequestBody.create(
                mapper.writeValueAsString(o),
                JSON
        );
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try(Response response = client.newCall(request).execute()){
            if(response.isSuccessful()){
                String respBody = response.body().string();
                log.info(respBody);
                return Optional.of(respBody);
            }
            else{
                log.error("InterServiceCommunicationProvider returned "+response.code()+" by "+url);
                return Optional.empty();
            }
        }catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }

    public Optional<String> addTransaction(AuctionClosing a) throws JsonProcessingException{
        return postRequestToUrl(MPOFFICE_SERVER_URL+"/meme/addTransaction", a);
    }

    public Optional<JSONObject> findUserById(Long userId){
        return getRequestToUrl(MPOFFICE_SERVER_URL+"/user/"+userId);
    }
    public Optional<JSONObject> findMemeById(Long memeId){
        return getRequestToUrl(MPOFFICE_SERVER_URL+"/meme/"+memeId);
    }
    public Optional<JSONObject> findFromAddressAndToAddress(Long from, Long to, Long meme){
        return getRequestToUrl(MPOFFICE_SERVER_URL+"/alarm/auction/transferinfo?from="+from+"&to="+to+"&meme="+meme);
    }
}

