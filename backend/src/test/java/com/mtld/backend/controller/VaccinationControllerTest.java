package com.mtld.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.vaccine.Vaccination;
import com.mtld.backend.entity.vaccine.Vaccine;
import com.mtld.backend.jwt.JwtTokenProvider;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.repository.vaccine.VaccinationRepository;
import com.mtld.backend.repository.vaccine.VaccineRepositpry;
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
import org.springframework.test.web.servlet.MockMvc;

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
class VaccinationControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private VaccineRepositpry vaccineRepositpry;

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String access_token;

    private Dog dog;

    private User user;

    private Vaccination vaccination;

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

        Vaccine vaccine = vaccineRepositpry.findByName("코로나");
        vaccination = vaccinationRepository.save(Vaccination.builder()
                .dog(dog)
                .vaccine(vaccine)
                .expectDate(ConvertDate.stringToDate("2022-10-15"))
                .build());


        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        this.access_token = tokenDto.getAccessToken();
    }

    @AfterEach
    void after() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("예방접종 알림 등록")
    void registerVaccination() throws Exception {

        Vaccine vaccine = vaccineRepositpry.findByName("광견병");
        VaccinationRequestDto requestDto = new VaccinationRequestDto(dog.getId(), vaccine.getId(), "2022-11-06");
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(requestDto);

        mvc.perform(post("/api/vaccine")
                .header("Authorization", "Bearer " + access_token)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("예방접종 정보 전체 조회")
    void getAllVaccine() throws Exception {

        String name = "$.[?(@.name == '%s')]";

        mvc.perform(get("/api/vaccine/all")
                .header("Authorization", "Bearer " + access_token))
                .andExpect(jsonPath(name, "DHPPL").exists())
                .andExpect(jsonPath(name, "코로나").exists())
                .andExpect(jsonPath(name, "켄넬코프").exists())
                .andExpect(jsonPath(name, "광견병").exists())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("해당 반려견의 예방접종 알림 정보 조회")
    void findByDogId() throws Exception {

        String medicineId = "$.[?(@.id == '%s')]";
        String expectDate = "$.[?(@.expectDate == '%s')]";

        mvc.perform(get("/api/vaccine/" + dog.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(jsonPath(medicineId, vaccination.getId()).exists())
                .andExpect(jsonPath(expectDate, "2022-10-15").exists())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("반려견 예방접종 알림 수정")
    void updateVaccination() throws Exception {

        VaccinationUpdateRequestDto requestDto = new VaccinationUpdateRequestDto(vaccination.getId(), "2022-10-26");
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(requestDto);

        mvc.perform(patch("/api/vaccine")
                .header("Authorization", "Bearer " + access_token)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("반려견 예방접종 알림 삭제")
    void deleteVaccination() throws Exception {

        mvc.perform(delete("/api/vaccine/" + vaccination.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }
}