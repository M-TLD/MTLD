package com.mtld.backend.service.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtld.backend.config.SecurityUtil;
import com.mtld.backend.dto.token.KakaoProfileDto;
import com.mtld.backend.dto.token.KakaoTokenDto;
import com.mtld.backend.dto.token.ReissueDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.dto.user.LoginResponseDto;
import com.mtld.backend.dto.user.UserInfoDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.jwt.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/23
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    String KAKAO_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    String KAKAO_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    String GRANT_TYPE;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    String CLIENT_SECRET;


    @Override
    public UserInfoDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("해당하는 id : {" + id + "}에 따른 유저를 조회할수 없습니다."));
        return UserInfoDto.of(user);
    }

    public KakaoTokenDto getKakaoAccessToken(String code) {
        log.info("getKakaoAccessToken = {}", code);
        RestTemplate rt = new RestTemplate();

        rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        rt.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                HttpStatus statusCode = response.getStatusCode();
                return statusCode.series() == HttpStatus.Series.SERVER_ERROR;
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        System.out.println("여기여기@@@");
        // HttpBody 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", KAKAO_CLIENT_ID); //카카오 앱 REST API 키
        params.add("redirect_uri", KAKAO_REDIRECT_URI);
        params.add("code", code); //인가 코드 요청시 받은 인가 코드값, 프론트에서 받아오는 그 코드
        params.add("client_secret", CLIENT_SECRET);

        // 헤더와 바디 합치기 위해 HttpEntity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        log.info("kakaoTokenRequest = {}", kakaoTokenRequest);

        // 카카오로부터 Access token 수신
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenDto kakaoTokenDto = null;
        log.info("accessTokenResponse.getBody() = {}", accessTokenResponse.getBody());
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    public User getKakaoInfo(String kakaoAccessToken) {

        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 보내고, response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        log.info("profileResponse.toString() ={}", accountInfoResponse.toString());

        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfileDto kakaoAccountDto = null;
        try {
            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoProfileDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // kakaoAccountDto 에서 필요한 정보 꺼내서 Account 객체로 매핑
        String email = kakaoAccountDto.getKakao_account().getEmail();
        String kakaoName = kakaoAccountDto.getProperties().getNickname();

        return User.builder()
                .platform("KAKAO")
                .oauthId(email)
                .name(kakaoName)
                .roleType(RoleType.USER)
                .build();
    }

    public LoginResponseDto kakaoLogin(String kakaoAccessToken) {
        // kakaoAccessToken 으로 회원정보 받아오기
        User user = getKakaoInfo(kakaoAccessToken);

        log.info("user = {}", user);
        Optional<User> findByOauthId = userRepository.findByOauthId(user.getOauthId());

        User loginUser;
        if (findByOauthId.isEmpty()) {
            loginUser = userRepository.save(user);
        } else {
            loginUser = findByOauthId.get();
        }


        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(loginUser.getOauthId(), loginUser.getId());

        redisTemplate.opsForValue().set(
                loginUser.getOauthId(),
                tokenDto.getRefreshToken(),
                tokenDto.getRefreshTokenExpiresIn(),
                TimeUnit.MILLISECONDS
        );

        return LoginResponseDto.of(loginUser, tokenDto);
    }

    public TokenDto reissue(ReissueDto reissueDto) {
        log.info("Reissue 서비스 시작 ####### reissueDto = {}", reissueDto);
        if (!jwtTokenProvider.validateToken(reissueDto.getRefreshToken())) {
            log.info("refresh token 이 유효하지 않음");
            throw new BadRequestException("Refresh Token 이 유효하지 않습니다.");
        }
        Authentication authentication = jwtTokenProvider.getAuthentication(reissueDto.getAccessToken());
        log.info("authentication = {}", authentication.toString());
        log.info("authentication.name = {}", authentication.getName());
        String refreshToken = redisTemplate.opsForValue().get(authentication.getName());
        log.info("reids에서 refreshToken가져오기");
        log.info("refreshToken = {}", refreshToken);
        if (refreshToken == null || !refreshToken.equals(reissueDto.getRefreshToken())) {
            log.info("토큰의 유저 정보가 일치하지 않음");
            throw new BadRequestException("토큰의 유저 정보가 일치하지 않습니다.");
        }
        User user = userRepository.findByOauthId(authentication.getName()).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        log.info("user = {}", user.getOauthId());
        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        log.info("tokenDto = {}", tokenDto);
        redisTemplate.opsForValue().set(
                authentication.getName(),
                tokenDto.getRefreshToken(),
                tokenDto.getRefreshTokenExpiresIn(),
                TimeUnit.MILLISECONDS
        );
        return tokenDto;
    }

    public UserInfoDto getMyInfoSecret() {
        log.info("SecurityUtil.getCurrentMemberId() = {}", SecurityUtil.getCurrentOauthId());
        User user = userRepository.findByOauthId(SecurityUtil.getCurrentOauthId()).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));

        return UserInfoDto.of(user);
    }
}