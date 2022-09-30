package com.mtld.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtld.backend.dto.diary.record.RecordRequestDto;
import com.mtld.backend.dto.diary.walking.WalkingRequestDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.jwt.JwtTokenProvider;
import com.mtld.backend.repository.diary.RecordRepository;
import com.mtld.backend.repository.diary.WalkingRepository;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * created by seongmin on 2022/09/28
 */
@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
class DiaryControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private WalkingRepository walkingRepository;
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
    public void before() throws Exception {
        dogRepository.deleteAll();
        userRepository.deleteAll();
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
    @DisplayName("다이어리(일지) 작성")
    void writeRecord() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "ㄱㅈ.PNG", "image/png", new FileInputStream("C:\\ssafy\\ㄱㅈ.PNG"));

        MockPart mockJsonPart = new MockPart("record", "{\"diaryDate\": \"2022-09-19\", \"mainText\": \"오늘 날씨좋아\"}".getBytes());
        mockJsonPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mvc.perform(multipart("/api/diary/record")
                .file(file)
                .part(mockJsonPart).header("Authorization", "Bearer " + access_token))
                .andExpect(status().isCreated())
                .andReturn().getRequest();

    }
    @Test
    @DisplayName("id로 다이어리(일지) 조회")
    void recordDetailById() throws Exception {
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Record record = recordRepository.save(Record.builder()
                .mainText("날씨가 좋아서 바비랑 산책하고 왔어요.")
                .user(user)
                .diaryDate(date)
                .build());
        mvc.perform(get("/api/diary/record/" + record.getId())
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("date로 다이어리(일지) 조회")
    void recordDetailByDate() throws Exception {
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Record record = recordRepository.save(Record.builder()
                .mainText("날씨가 좋아서 바비랑 산책하고 왔어요.")
                .user(user)
                .diaryDate(date)
                .build());
        mvc.perform(get("/api/diary/record/date/" + "2022-09-19")
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("다이어리(일지) 삭제")
    void deleteRecord() throws Exception {
        User user1 = userRepository.findByOauthId("foo@test.com").get();
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Record record = recordRepository.save(Record.builder()
                .mainText("날씨가 좋아서 바비랑 산책하고 왔어요.")
                .user(user1)
                .diaryDate(date)
                .build());
        date = ConvertDate.stringToDate("2022-09-20");
        Record record2 = recordRepository.save(Record.builder()
                .mainText("오늘은 집에서 바비랑 낮잠")
                .user(user)
                .diaryDate(date)
                .build());

        // 삭제 전 record 개수 2개
        assertThat(recordRepository.findAll().size()).isEqualTo(2);

        // record 삭제 api 호출
        mvc.perform(delete("/api/diary/record/" + record.getId())
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());

        // 삭제 후 record 개수 1개
        assertThat(recordRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("id로 산책일지 조회")
    void walkingDetailById() throws Exception {
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Walking walking = walkingRepository.save(Walking.builder()
                .diaryDate(date)
                .distance(2.3)
                .walkingTime(1.5)
                .user(user)
                .dog(dog)
                .build());

        mvc.perform(get("/api/diary/walking/" + walking.getId())
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("산책일지 등록")
    void writeWalking() throws Exception {
        WalkingRequestDto requestDto = new WalkingRequestDto("2020-09-28", 1.5, 1.7, dog.getId());
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(requestDto);
        mvc.perform(post("/api/diary/walking")
                        .header("Authorization", "Bearer " + access_token)
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("산책일지 date로 조회")
    void walkingDetailByDate() throws Exception {
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Walking walking = walkingRepository.save(Walking.builder()
                .diaryDate(date)
                .distance(2.3)
                .walkingTime(1.5)
                .user(user)
                .dog(dog)
                .build());

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("dogId", Long.toString(walking.getDog().getId()));
        params.add("date", "2022-09-19");

        mvc.perform(get("/api/diary/walking/date")
                        .queryParams(params)
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("산책일지 삭제")
    void deleteWalking() throws Exception {
        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Walking walking1 = walkingRepository.save(Walking.builder()
                .diaryDate(date)
                .distance(2.3)
                .walkingTime(1.5)
                .user(user)
                .dog(dog)
                .build());

        date = ConvertDate.stringToDate("2022-09-20");
        Walking walking2 = walkingRepository.save(Walking.builder()
                .diaryDate(date)
                .distance(1.2)
                .walkingTime(0.8)
                .user(user)
                .dog(dog)
                .build());

        // 삭제 전 record 개수 2개
        assertThat(walkingRepository.findAll().size()).isEqualTo(2);

        // record 삭제 api 호출
        mvc.perform(delete("/api/diary/walking/" + walking1.getId())
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());

        // 삭제 후 record 개수 1개
        assertThat(walkingRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("다이어리 일지와 산책 작성한 날짜 모두 조회")
    void allDiaryDate() throws Exception {
        mvc.perform(get("/api/diary")
                        .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }
}