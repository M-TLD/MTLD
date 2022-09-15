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
    /**
     * id값에 해당하는 유저 정보 조회
     *
     * @param Long id
     * @return 모든 정보가 담긴 User 객체, 해당 값 없을 시 null
     * @throws Exception id에 해당하는 유저가 없을 시 예외 발생
     */
    public User getUserById(long id) throws Exception;

    /**
     * 닉네임에 해당하는 유저 정보 조회
     * @param nickname 검색하려는 유저의 닉네임
     * @return 해당 유저
     * @throws Exception 해당하는 유저가 없을 시 예외 발생
     */
    public User getUserByNickname(String nickname) throws Exception;

    /**
     * 이메일로 유저 정보를 조회합니다.
     * @param email 검색하려는 유저의 이메일
     * @return 해당 유저
     * @throws Exception 해당하는 유저가 없을 시 예외 발생
     */
    public User getUserByEmail(String email) throws Exception;

    KakaoTokenDto getKakaoAccessToken(String code);

    User getKakaoInfo(String kakaoAccessToken);

    LoginResponseDto kakaoLogin(String kakaoAccessToken);

    TokenDto reissue(ReissueDto reissueDto);

    UserInfoDto getMyInfoSecret();


}
