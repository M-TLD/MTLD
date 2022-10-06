package com.mtld.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mtld.backend.dto.medicine.TakingMedicineRequestDto;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
import com.mtld.backend.dto.token.TokenDto;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.jwt.JwtTokenProvider;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.medicine.MedicineRepository;
import com.mtld.backend.repository.medicine.TakingMedicineRepository;
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
class TakingMedicineControllerTest {


    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DogRepository dogRepository;

    @Autowired
    private BreedRepository breedRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private TakingMedicineRepository takingMedicineRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String access_token;

    private Dog dog;

    private User user;

    private TakingMedicine takingMedicine;

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

        Medicine medicine = medicineRepository.findByName("진드기약");
        takingMedicine = takingMedicineRepository.save(TakingMedicine.builder()
                .dog(dog)
                .expectDate(ConvertDate.stringToDate("2022-10-15"))
                .medicine(medicine)
                .build());


        TokenDto tokenDto = jwtTokenProvider.generateJwtToken(user.getOauthId(), user.getId());
        this.access_token = tokenDto.getAccessToken();
    }

    @AfterEach
    void after() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("약 알림 등록")
    void registerTakingMedicine() throws Exception {

        Medicine medicine = medicineRepository.findByName("구충제");
        TakingMedicineRequestDto requestDto = new TakingMedicineRequestDto(dog.getId(), medicine.getId(), "2022-10-16");
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(requestDto);

        mvc.perform(post("/api/medicine")
                .header("Authorization", "Bearer " + access_token)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("약 전체 조회")
    void getAllMedicine() throws Exception {

        String name = "$.[?(@.name == '%s')]";

        mvc.perform(get("/api/medicine/all")
                .header("Authorization", "Bearer " + access_token))
                .andExpect(jsonPath(name, "진드기약").exists())
                .andExpect(jsonPath(name, "심장사상충약").exists())
                .andExpect(jsonPath(name, "구충제").exists())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("해당 반려견의 약 복용 알림 정보 조회")
    void findByDogID() throws Exception {

        String medicineId = "$.[?(@.id == '%s')]";
        String expectDate = "$.[?(@.expectDate == '%s')]";

        mvc.perform(get("/api/medicine/" + dog.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(jsonPath(medicineId, takingMedicine.getId()).exists())
                .andExpect(jsonPath(expectDate, "2022-10-15").exists())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("반려견 약 복용 알림 수정")
    void updateTakingMedicine() throws Exception {

        TakingMedicineUpdateRequestDto requestDto = new TakingMedicineUpdateRequestDto(takingMedicine.getId(), "2022-10-26");
        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(requestDto);

        mvc.perform(patch("/api/medicine")
                .header("Authorization", "Bearer " + access_token)
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("반려견 약 복용 알림 삭제")
    void deleteTakingMedicine() throws Exception {

        mvc.perform(delete("/api/medicine/" + takingMedicine.getId())
                .header("Authorization", "Bearer " + access_token))
                .andExpect(status().isOk());
    }
}