package com.memepatentoffice.auction.common.util;

import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class InterServiceCommunicationProvider {
    private final OkHttpClient client = new OkHttpClient();
    private final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public String getResponsefromOtherServer(String url){
        Request request = new Request.Builder()
                .url(url)
                .build();
        try(Response response = client.newCall(request).execute()){
            String respBody = response.body().string();
            log.info(respBody);
            return respBody;
        }catch (IOException ex){
            throw new RuntimeException(ex);
        }
    }
}
