package com.mtld.backend.controller;

import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.jwt.JwtTokenProvider;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * created by seongmin on 2022/09/30
 */
@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private BreedRepository breedRepository;

    private String access_token;

    private Dog dog;

    private User user;

    @BeforeEach
    public void before() {
        String oauthId = "foo@test.com";
        String platform = "platform";
        String name = "홍길동";
        RoleType roleType = RoleType.USER;

        user = userRepository.save(User.builder()
                .oauthId(oauthId)
                .name(name)
                .platform(platform)
                .roleType(roleType)
                .build());

        dog = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2021-05-10", DateTimeFormatter.ISO_DATE))
                .breed(breedRepository.findByCode("000054").get())
                .name("바비")
                .gender(Gender.FEMALE)
                .user(user)
                .neuter(false)
                .weight(10.3)
                .build());

        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        this.access_token = tokenDto.getAccessToken();
    }

    @AfterEach
    void after() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("로그인한 사용자 정보 확인")
    void getUserInfo() throws Exception {

        String expectByName = "$.[?(@.name == '%s')]";

        mvc.perform(get("/api/user")
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk())
                .andExpect(jsonPath(expectByName, "홍길동").exists());
    }

    @Test
    @DisplayName("로그인한 사용자의 반려견 조회")
    void getDogsByUser() throws Exception {

        String expectByName = "$.[?(@.name == '%s')]";

        mvc.perform(get("/api/user/dogs")
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk())
                .andExpect(jsonPath(expectByName, "바비").exists());
    }
}