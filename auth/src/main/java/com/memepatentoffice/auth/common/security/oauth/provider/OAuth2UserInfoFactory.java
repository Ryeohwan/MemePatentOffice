package com.memepatentoffice.auth.common.security.oauth.provider;


import com.memepatentoffice.auth.common.exception.BadRequestException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) throws BadRequestException {

        if (registrationId.equalsIgnoreCase("kakao")) {
            return new KakaoOAuth2UserInfo(attributes);
        } else {
            throw new BadRequestException( registrationId + "login is not supported");
        }
    }
}