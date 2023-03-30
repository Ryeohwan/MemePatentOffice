package com.memepatentoffice.auth.common.security.oauth;


import com.memepatentoffice.auth.common.exception.BadRequestException;
import com.memepatentoffice.auth.common.exception.NotFoundException;
import com.memepatentoffice.auth.common.security.UserPrincipal;
import com.memepatentoffice.auth.common.security.oauth.provider.OAuth2UserInfo;
import com.memepatentoffice.auth.common.security.oauth.provider.OAuth2UserInfoFactory;
import com.memepatentoffice.auth.domain.api.request.EmailRequest;
import com.memepatentoffice.auth.domain.api.request.UserRequest;
import com.memepatentoffice.auth.domain.api.response.IdResponse;
import com.memepatentoffice.auth.domain.api.service.UserService;
import com.memepatentoffice.auth.domain.db.entity.User;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

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
        IdResponse idResponse = userService.getId(EmailRequest.builder().email(oAuth2UserInfo.getEmail()).build());
        if(idResponse.getId() == null){
            // 디비에 해당하는 이메일의 유저가 없을때
            idResponse = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        log.info(idResponse.getId().toString());

        User user = User.builder()
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .password("12345")
                .id(idResponse.getId())
                .build();

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private IdResponse registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) throws BadRequestException {
        log.info("[회원가입] :" + oAuth2UserInfo.toString());

        User user = User.builder()
                .name(oAuth2UserInfo.getEmail().split("@")[0])
                .email(oAuth2UserInfo.getEmail())
                .build();


        return userService.registUser(UserRequest.builder()
                .nickname(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .build());
    }

//    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
//        existingUser.setName(oAuth2UserInfo.getName());
//        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
//        return userRepository.save(existingUser);d
//    }

}