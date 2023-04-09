package com.memepatentoffice.auction.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    //TODO: 클래스 분리하고 상속받아서 만들기
    private final String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public Optional<String> getRequestToUrlGetString(String url){
        Request request = new Request.Builder()
                .url(url)
                .build();
        try(Response response = client.newCall(request).execute()){
            if(response.isSuccessful()){
                String respBody = response.body().string();
                //log.info(respBody);
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
    public Optional<JSONObject> getRequestToUrlGetJsonObject(String url){
        Optional<String> respBody = getRequestToUrlGetString(url);
//        return respBody.map(JSONObject::new);
        if(respBody.isPresent())
            return Optional.of(new JSONObject(respBody.get()));
        else return Optional.empty();
    }

    public Optional<String> postRequestToUrlGetString(String url, Object o) throws JsonProcessingException {
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
                //log.info(respBody);
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

    public Optional<JSONObject> findUserById(Long userId){
        return getRequestToUrlGetJsonObject(MPOFFICE_SERVER_URL+"/user/"+userId);
    }
    public Optional<JSONObject> findMemeById(Long memeId){
        return getRequestToUrlGetJsonObject(MPOFFICE_SERVER_URL+"/meme/"+memeId);
    }
    //path: register, start, end
    public Optional<String> setAlarm(String path, Long auctionId, Long userId, Long memeId){
        return getRequestToUrlGetString(MPOFFICE_SERVER_URL+"/alarm/auction/"+path+"?"+
                "auction="+auctionId
        +"&user="+userId
        +"&meme="+memeId);
    }
    public Optional<JSONObject> findFromAddressAndToAddress(Long from, Long to, Long meme){
        String url = MPOFFICE_SERVER_URL+"/alarm/auction/transferinfo?from="+from+"&to="+to+"&meme="+meme;
        return getRequestToUrlGetJsonObject(url);
    }
}

