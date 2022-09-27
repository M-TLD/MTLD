package com.mtld.backend.service.vaccine;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.vaccine.Vaccine;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.repository.vaccine.VaccineRepositpry;
import com.mtld.backend.service.dog.DogServiceImpl;
import com.mtld.backend.util.ConvertDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class VaccinationServiceImplTest {
    @Autowired
    DogRepository dogRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BreedRepository breedRepository;
    @Autowired
    DogServiceImpl dogService;
    @Autowired
    VaccineRepositpry vaccineRepositpry;
    @Autowired
    VaccinationService vaccinationService;

    @BeforeEach
    void before() {
        // 유저 등록
        userRepository.save(User.builder().name("테스터").oauthId("test@gmail.com").platform("KAKAO").roleType(RoleType.USER).build());
        User user = userRepository.findByOauthId("test@gmail.com").get();
        // 반려견 품종 등록
        breedRepository.save(new Breed("000046", "잉글리쉬 세터"));
        // 반려견 등록
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        dogService.registerDog(user.getId(), dogRequestDto, null);
        // 약 등록
        vaccineRepositpry.save(new Vaccine("예방접종1"));
        vaccineRepositpry.save(new Vaccine("예방접종2"));
        vaccineRepositpry.save(new Vaccine("예방접종3"));
    }

    @Test
    void getVaccinationResponseDtoById() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);

        // 예방접종 등록
        VaccinationRequestDto vaccinationRequestDto = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종1").getId()).expectDate("2021-11-11").build();
        VaccinationRequestDto vaccinationRequestDto2 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종2").getId()).expectDate("2021-11-12").build();
        VaccinationRequestDto vaccinationRequestDto3 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종3").getId()).expectDate("2021-11-13").build();
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto2);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto3);

        VaccinationResponseDto vaccinationResponseDto = vaccinationService.getVaccinationResponseDtoById(2L);
        Assertions.assertThat(vaccinationResponseDto.getExpectDate()).isEqualTo(ConvertDate.stringToDate("2021-11-12"));
    }

    @Test
    void getVaccinationByDog() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        VaccinationRequestDto vaccinationRequestDto = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종1").getId()).expectDate("2021-11-11").build();
        VaccinationRequestDto vaccinationRequestDto2 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종2").getId()).expectDate("2021-11-12").build();
        VaccinationRequestDto vaccinationRequestDto3 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종3").getId()).expectDate("2021-11-13").build();
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto2);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto3);

        List<VaccinationResponseDto> result = vaccinationService.getVaccinationByDog(user.getId(), dog.getId());
        Assertions.assertThat(result.size()).isEqualTo(3);
    }

    @Test
    void registerVaccination() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        Vaccine vaccine = vaccineRepositpry.findByName("예방접종1");
        VaccinationRequestDto vaccinationRequestDto = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccine.getId()).expectDate("2021-11-11").build();
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto);
        VaccinationResponseDto vaccinationResponseDto = vaccinationService.getVaccinationResponseDtoById(1L);
        Assertions.assertThat(vaccinationResponseDto.getExpectDate()).isEqualTo("2021-11-11");

    }

    @Test
    void updateVaccination() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);
        Vaccine vaccine = vaccineRepositpry.findByName("예방접종1");
        VaccinationRequestDto vaccinationRequestDto = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccine.getId()).expectDate("2021-11-11").build();
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto);
        VaccinationUpdateRequestDto vaccinationUpdateRequestDto = VaccinationUpdateRequestDto.builder().id(1L).expectDate("2021-12-31").build();

        vaccinationService.updateVaccination(user.getId(), vaccinationUpdateRequestDto);

        VaccinationResponseDto vaccinationResponseDto = vaccinationService.getVaccinationResponseDtoById(1L);
        Assertions.assertThat(vaccinationResponseDto.getExpectDate()).isEqualTo("2021-12-31");

    }

    @Test
    void deleteVaccination() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog = dogService.getDog(1L);

        VaccinationRequestDto vaccinationRequestDto = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종1").getId()).expectDate("2021-11-11").build();
        VaccinationRequestDto vaccinationRequestDto2 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종2").getId()).expectDate("2021-11-12").build();
        VaccinationRequestDto vaccinationRequestDto3 = VaccinationRequestDto.builder().dogId(dog.getId()).vaccineId(vaccineRepositpry.findByName("예방접종3").getId()).expectDate("2021-11-13").build();
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto2);
        vaccinationService.registerVaccination(user.getId(), vaccinationRequestDto3);

        vaccinationService.deleteVaccination(user.getId(), 1L);
        List<VaccinationResponseDto> result = vaccinationService.getVaccinationByDog(user.getId(), dog.getId());
        Assertions.assertThat(result.size()).isEqualTo(2);

    }
}