package com.memepatentoffice.mpoffice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class GcpConfiguration {
    @Value("robust-metrics-38060")
    private String projectId;

    private  ClassPathResource credentials = new ClassPathResource("json/robust-metrics-380604-8e932ce5312a.json");
//    JSONObject json = (JSONObject) new JSONParser().parse(new InputStreamReader(resource.getInputStream(), "UTF-8")); //json-simple

//    @Value("${classpath:robust-metrics-380604-8e932ce5312a.json}")
//    private Resource credentials;

    @Bean
    public Storage storage() throws IOException {
        return StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.fromStream(credentials.getInputStream()))
//                .setCredentials(GoogleCredentials.fromStream(resourceLoader.getResource("classpath:robust-metrics-380604-8e932ce5312a.json").getInputStream()))
                .build()
                .getService();
    }
}
