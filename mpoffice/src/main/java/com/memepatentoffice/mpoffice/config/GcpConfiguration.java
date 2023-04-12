package com.memepatentoffice.mpoffice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.memepatentoffice.mpoffice.domain.meme.api.response.MemeResponse;
import com.memepatentoffice.mpoffice.domain.meme.api.service.MemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Configuration
public class GcpConfiguration {  // 인젝션 위치 참조해서 어떻게 해결해야하나
//    @Autowired
//    ResourceLoader resourceLoader;
//    private Resource credentials = resourceLoader.getResource("classpath:robust-metrics-380604-8e932ce5312a.json");
    @Value("robust-metrics-38060")
    private String projectId;

    private  ClassPathResource credentials = new ClassPathResource("json/robust-metrics-380604-8e932ce5312a.json");

//    @Value("${classpath:robust-metrics-380604-8e932ce5312a.json}")
//    private Resource credentials;

    @Bean
    public Storage storage() throws IOException {
        return StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.fromStream(credentials.getInputStream()))
//              .setCredentials(GoogleCredentials.fromStream(resourceLoader.getResource("classpath:robust-metrics-380604-8e932ce5312a.json").getInputStream()))
                .build()
                .getService();
    }
}
