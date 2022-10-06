package com.mtld.backend.controller;

import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.jwt.JwtTokenProvider;
import com.mtld.backend.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * created by seongmin on 2022/10/06
 */
@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
class NewsControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    private String access_token;

    @BeforeEach
    public void before() {
        String oauthId = "foo@test.com";
        String platform = "platform";
        String name = "홍길동";
        RoleType roleType = RoleType.USER;

        User user = userRepository.save(User.builder()
                .oauthId(oauthId)
                .name(name)
                .platform(platform)
                .roleType(roleType)
                .build());

        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        this.access_token = tokenDto.getAccessToken();
    }

    @AfterEach
    void after() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("반려견 관련 뉴스 조회")
    void getNews() throws Exception {
        mvc.perform(get("/api/news")
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }
}