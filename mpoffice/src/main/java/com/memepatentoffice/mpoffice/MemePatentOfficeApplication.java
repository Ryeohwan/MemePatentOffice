package com.memepatentoffice.mpoffice;

import com.memepatentoffice.mpoffice.domain.meme.api.service.ImageAnalysisQuickstart;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableCaching
@EnableJpaAuditing
@SpringBootApplication
@RequiredArgsConstructor
public class MemePatentOfficeApplication {
	public static void main(String[] args) {
		SpringApplication.run(MemePatentOfficeApplication.class, args);
	}
}
