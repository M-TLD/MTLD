package com.mtld.backend.controller;

import com.mtld.backend.service.user.UserService;
import com.mtld.backend.dto.token.ReissueDto;
import com.mtld.backend.dto.token.TokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;


/**
 * created by seongmin on 2022/09/14
 * updated by seongmin on 2022/09/15
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/login/oauth2")
public class AuthController {
    private final UserService userService;

    @GetMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestParam String code) {
        log.info("code = {}", code);
        String kakaoAccessToken = userService.getKakaoAccessToken(code).getAccess_token();
        return ResponseEntity.status(OK).body(userService.kakaoLogin(kakaoAccessToken));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        userService.logout(userService.getMyInfoSecret().getId());
        return ResponseEntity.status(OK).build();
    }

    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestHeader(value = "Access-Token") String accessToken,
                                     @RequestHeader(value = "Refresh-Token") String refreshToken) {

        log.info("accessToken = {}", accessToken);
        log.info("refreshToken = {}", refreshToken);
        TokenDto reissue = userService.reissue(new ReissueDto(accessToken, refreshToken));
        log.info("@@@@@@@@@@@@@@@@@@@리이슈 성공@@@@@@@@@@@@@@@@@@@@@@@@");
        return ResponseEntity.status(OK).body(reissue);
    }
}
