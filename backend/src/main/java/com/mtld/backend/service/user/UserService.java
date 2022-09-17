package com.mtld.backend.service.user;

import com.mtld.backend.dto.token.KakaoTokenDto;
import com.mtld.backend.dto.token.ReissueDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.dto.user.LoginResponseDto;
import com.mtld.backend.dto.user.UserInfoDto;
import com.mtld.backend.entity.User;

/**
 * created by seongmin on 2022/09/15
 * updated by myeongseok on 2022/09/15
 */
public interface UserService {
    public User getUserById(long id) throws Exception;

    public User getUserByNickname(String nickname) throws Exception;

    public User getUserByEmail(String email) throws Exception;

    KakaoTokenDto getKakaoAccessToken(String code);

    User getKakaoInfo(String kakaoAccessToken);

    LoginResponseDto kakaoLogin(String kakaoAccessToken);

    TokenDto reissue(ReissueDto reissueDto);

    UserInfoDto getMyInfoSecret();


}
