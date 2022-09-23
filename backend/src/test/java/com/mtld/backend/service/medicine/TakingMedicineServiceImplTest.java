package com.mtld.backend.service.medicine;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.medicine.TakingMedicineRequestDto;
import com.mtld.backend.dto.medicine.TakingMedicineResponseDto;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.medicine.MedicineRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.service.dog.DogServiceImpl;
import com.mtld.backend.util.ConvertDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TakingMedicineServiceImplTest {
    @Autowired
    DogRepository dogRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BreedRepository breedRepository;
    @Autowired
    DogServiceImpl dogService;
    @Autowired
    MedicineRepository medicineRepository;
    @Autowired
    TakingMedicineServiceImpl takingMedicineService;

    @BeforeEach
    void before() {
        // 유저 등록
        userRepository.save(User.builder().name("테스터").oauthId("test@gmail.com").platform("KAKAO").roleType(RoleType.USER).build());
        User user = userRepository.findByOauthId("test@gmail.com").get();
        // 반려견 품종 등록
        breedRepository.save(new Breed("말티즈"));
        // 반려견 등록
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate(ConvertDate.stringToDate("2020-02-02")).gender(Gender.MALE).weight(20.9).neuter(true).breedId(breedRepository.findAll().get(0).getId()).build();
        dogService.registerDog(user.getId(), dogRequestDto);
        // 약 등록
        medicineRepository.save(new Medicine("약1"));
        medicineRepository.save(new Medicine("약2"));
        medicineRepository.save(new Medicine("약3"));
    }

    @Test
    void getTakingMedicineById() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);

        // 약 섭취 정보 등록
        TakingMedicineRequestDto takingMedicineRequestDto = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약1").getId()).expectDate("2021-11-11").build();
        TakingMedicineRequestDto takingMedicineRequestDto2 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약2").getId()).expectDate("2021-11-12").build();
        TakingMedicineRequestDto takingMedicineRequestDto3 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약3").getId()).expectDate("2021-11-13").build();
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto2);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto3);

        TakingMedicineResponseDto takingMedicineResponseDto = takingMedicineService.getTakingMedicineById(2L);
        Assertions.assertThat(takingMedicineResponseDto.getExpectDate()).isEqualTo(ConvertDate.stringToDate("2021-11-12"));

    }

    @Test
    void getMedicineByDog() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        // 약 섭취 정보 등록
        TakingMedicineRequestDto takingMedicineRequestDto = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약1").getId()).expectDate("2021-11-11").build();
        TakingMedicineRequestDto takingMedicineRequestDto2 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약2").getId()).expectDate("2021-11-12").build();
        TakingMedicineRequestDto takingMedicineRequestDto3 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약3").getId()).expectDate("2021-11-13").build();
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto2);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto3);

        List<TakingMedicineResponseDto> result = takingMedicineService.getTakingMedicineByDog(user.getId(), dog.getId());
        Assertions.assertThat(result.size()).isEqualTo(3);
    }

    @Test
    void registerMedicine() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        Medicine medicine = medicineRepository.findByName("약1");
        TakingMedicineRequestDto takingMedicineRequestDto = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicine.getId()).expectDate("2021-11-11").build();
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto);
        TakingMedicineResponseDto takingMedicineResponseDto = takingMedicineService.getTakingMedicineById(1L);
        Assertions.assertThat(takingMedicineResponseDto.getExpectDate()).isEqualTo("2021-11-11");
    }

    @Test
    void updateMedicine() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        Medicine medicine = medicineRepository.findByName("약1");
        TakingMedicineRequestDto takingMedicineRequestDto = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicine.getId()).expectDate("2021-11-11").build();
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto);
        TakingMedicineUpdateRequestDto takingMedicineUpdateRequestDto = TakingMedicineUpdateRequestDto.builder().id(1L).expectDate("2021-12-31").build();

        takingMedicineService.updateTakingMedicine(user.getId(), takingMedicineUpdateRequestDto);

        TakingMedicineResponseDto takingMedicineResponseDto = takingMedicineService.getTakingMedicineById(1L);
        Assertions.assertThat(takingMedicineResponseDto.getExpectDate()).isEqualTo("2021-12-31");


    }

    @Test
    void deleteMedicine() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);

        TakingMedicineRequestDto takingMedicineRequestDto = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약1").getId()).expectDate("2021-11-11").build();
        TakingMedicineRequestDto takingMedicineRequestDto2 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약2").getId()).expectDate("2021-11-12").build();
        TakingMedicineRequestDto takingMedicineRequestDto3 = TakingMedicineRequestDto.builder().dogId(dog.getId()).medicineId(medicineRepository.findByName("약3").getId()).expectDate("2021-11-13").build();
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto2);
        takingMedicineService.registerTakingMedicine(user.getId(), takingMedicineRequestDto3);

        List<TakingMedicineResponseDto> result = takingMedicineService.getTakingMedicineByDog(user.getId(), dog.getId());
        Assertions.assertThat(result.size()).isEqualTo("2021-12-31");
    }
}