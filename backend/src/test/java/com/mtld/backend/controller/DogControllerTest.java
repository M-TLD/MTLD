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
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * created by seongmin on 2022/10/06
 */
@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
class DogControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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
    @DisplayName("해당 반려견의 정보 조회")
    void findById() throws Exception {

        String expectByName = "$.[?(@.name == '%s')]";

        mvc.perform(get("/api/dogs/" + dog.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk())
                .andExpect(jsonPath(expectByName, "바비").exists());
    }

    @Test
    @DisplayName("반려견 등록")
    void registerDog() throws Exception {

        MockMultipartFile file = new MockMultipartFile("image", "ㄱㅈ.PNG", "image/png", new FileInputStream("C:\\ssafy\\ㄱㅈ.PNG"));

        MockPart mockJsonPart = new MockPart("dog", "{\"name\":\"산초\",\"birthdate\":\"2018-09-05\",\"gender\":\"MALE\",\"weight\":9.3,\"neuter\":false,\"disease\":\"아직 없어\",\"code\":\"000032\"}" .getBytes());
        mockJsonPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mvc.perform(multipart("/api/dogs")
                .file(file)
                .part(mockJsonPart).header("Authorization", "Bearer " + access_token))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("반려견 정보 수정")
    void updateDog() throws Exception {

        MockMultipartFile file = new MockMultipartFile("image", "ㄱㅈ.PNG", "image/png", new FileInputStream("C:\\ssafy\\ㄱㅈ.PNG"));

        MockPart mockJsonPart = new MockPart("dog", ("{\"id\":" + dog.getId() + ",\"weight\":10.5}").getBytes());
        mockJsonPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        MockMultipartHttpServletRequestBuilder builder =
                multipart("/api/dogs");
        builder.with(new RequestPostProcessor() {
            @Override
            public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                request.setMethod("PATCH");
                return request;
            }
        });

        mvc.perform(builder
                .file(file)
                .part(mockJsonPart).header("Authorization", "Bearer " + access_token))
                .andExpect(status().isCreated());

    }

    @Test
    @DisplayName("반려견 삭제")
    void deleteDog() throws Exception {

        mvc.perform(delete("/api/dogs/" + dog.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }
}