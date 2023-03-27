package com.memepatentoffice.auction.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.memepatentoffice.auction"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo())
                .useDefaultResponseMessages(false);
    }
    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("REST API")
                .description("밈 특허청")
                .version("v1")
                .termsOfServiceUrl("https://j8a305.p.ssafy.io")
                .contact(new Contact(
                        "a305",
                        "https://j8a305.p.ssafy.io"
                        ,"developerhongjulee@gmail.com"
                ))
                .license("License")
                .licenseUrl("https://j8a305.p.ssafy.io")
                .build();
    }
}
