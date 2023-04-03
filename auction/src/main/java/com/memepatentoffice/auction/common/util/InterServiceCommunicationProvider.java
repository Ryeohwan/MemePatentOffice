package com.memepatentoffice.auction.common.util;

import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
public class InterServiceCommunicationProvider {
    //TODO: baseUrl을 생성자 파라미터로 받기 위해 팩토리로 만들기
    private final String MPOFFICE_SERVER_URL = "https://j8a305.p.ssafy.io/api/mpoffice";
    private final OkHttpClient client = new OkHttpClient();
    private final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    /*
    *    @Return
    * 404 not found인 경우 null을 반환한다
    * */
    public Optional<String> getResponsefromOtherServer(String url){
        Request request = new Request.Builder()
                .url(url)
                .build();
        try(Response response = client.newCall(request).execute()){
            if(response.isSuccessful()){
                String respBody = response.body().string();
                log.info(respBody);
                return Optional.of(respBody);
            }
            else{
                log.info("InterServiceCommunicationProvider returned "+response.code()+" by "+url);
                return Optional.empty();
            }
        }catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }
    public Optional<String> findUserById(Long userId){
        return getResponsefromOtherServer(MPOFFICE_SERVER_URL+"/api/mpoffice/user/info/"+userId);
    }
    public Optional<String> findMemeById(Long memeId){
        return getResponsefromOtherServer(MPOFFICE_SERVER_URL+"/api/mpoffice/meme?memeId="+memeId);
    }
    public boolean existsUserById(Long userId){
        return findUserById(userId).isPresent();
    }
    public boolean existsMemeById(Long memeId){
        return findMemeById(memeId).isPresent();
    }
}
