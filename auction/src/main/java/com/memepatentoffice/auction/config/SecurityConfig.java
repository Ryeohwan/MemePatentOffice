//package com.memepatentoffice.auction.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(
//        securedEnabled = true,
//        jsr250Enabled = true,
//        prePostEnabled = true
//)
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                .cors()
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .csrf()
//                .disable()
//                .formLogin()
//                .disable()
//                .httpBasic()
//                .disable();
//
////                // 접근제한 설정
////                .authorizeRequests()
////                .antMatchers("/",
////                        "/error",
////                        "/favicon.ico",
////                        "/**/*.png",
////                        "/**/*.gif",
////                        "/**/*.svg",
////                        "/**/*.jpg",
////                        "/**/*.html",
////                        "/**/*.css",
////                        "/**/*.js")
////                .permitAll()
////                .antMatchers("/api/auth/**", "/api/oauth2/**")
////                .permitAll()
////                .anyRequest()
////                .authenticated()
////                .and();
//
//
//        return httpSecurity.build();
//    }
//}
//
