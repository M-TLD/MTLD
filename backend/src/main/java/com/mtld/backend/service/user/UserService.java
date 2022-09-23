package com.mtld.backend.service.user;

import com.mtld.backend.dto.token.KakaoTokenDto;
import com.mtld.backend.dto.token.ReissueDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.dto.user.LoginResponseDto;
import com.mtld.backend.dto.user.UserInfoDto;
import com.mtld.backend.entity.User;

import static com.mtld.backend.exception.ExceptionMsg.USER_NOT_FOUND_MSG;

/**
 * created by seongmin on 2022/09/15
 * updated by seongmin on 2022/09/23
 */
public interface UserService {

    UserInfoDto getUserById(Long id);

    KakaoTokenDto getKakaoAccessToken(String code);

    User getKakaoInfo(String kakaoAccessToken);

    LoginResponseDto kakaoLogin(String kakaoAccessToken);

    TokenDto reissue(ReissueDto reissueDto);

    UserInfoDto getMyInfoSecret();


}
