package com.memepatentoffice.auth.domain.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    private Long id;

    private String name;

    private String imageUrl;

    @Email
    private String email;

    private String password;
//
//    private String provider;
//
//    private String providerId;

    // 서버간 통신 구현이 안되서 임시로 만들었다 지워야한다 필수!!!
    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}