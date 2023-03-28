package com.memepatentoffice.auth.common.security.oauth;


import com.memepatentoffice.auth.common.exception.BadRequestException;
import com.memepatentoffice.auth.common.exception.NotFoundException;
import com.memepatentoffice.auth.common.security.UserPrincipal;
import com.memepatentoffice.auth.common.security.oauth.provider.OAuth2UserInfo;
import com.memepatentoffice.auth.common.security.oauth.provider.OAuth2UserInfoFactory;
import com.memepatentoffice.auth.domain.db.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws NotFoundException, BadRequestException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        // 가져온 정보에서 이메일이 비어있을 경우 예외 발생
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            log.error("이메일을 찾을 수 없다");
            throw new NotFoundException("Email not found from OAuth2 provider");
        }

        // 유저가 DB에 등록되어있는지 확인
        // < -----  서버간통신 부분 ----- >

//        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

        User user;
        user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        user.setId(1L);
        user.setPassword("1234567890");

//        if(false) {
//            // DB에 있으면 바로 로그인 진행
//            user = userOptional.get();
//        } else {
//            // DB에 없으면 DB에 저장
//            // < -----  서버간통신 부분 ----- >
//            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
//            log.info("[회원가입] :" + user.toString());
//        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        log.info("[회원가입] :" + oAuth2UserInfo.toString());
        User user = User.builder()
                .provider(oAuth2UserRequest.getClientRegistration().getRegistrationId())
                .providerId(oAuth2UserInfo.getId())
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .imageUrl(oAuth2UserInfo.getImageUrl())
                .build();

        // 유저 정보를 디비에 저장
        // < -----  서버간통신 부분 ----- >
        return user;
    }

//    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
//        existingUser.setName(oAuth2UserInfo.getName());
//        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
//        return userRepository.save(existingUser);
//    }

}