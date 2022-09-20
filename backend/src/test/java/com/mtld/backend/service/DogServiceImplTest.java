package com.mtld.backend.service;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.service.dog.DogServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
class DogServiceImplTest {
    @Autowired
    DogRepository dogRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    BreedRepository breedRepository;
    @Autowired
    DogServiceImpl dogService;

    @BeforeEach
    void before() {
        User user = userRepository.save(User.builder().name("테스터").oauthId("test@gmail.com").platform("KAKAO").roleType(RoleType.USER).build());
        breedRepository.save(new Breed("말티즈"));
    }

    @Test
    void insertDog() {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");

        DogRequestDto dogRequestDto = new DogRequestDto();
        dogRequestDto.setName("바비");
        dogRequestDto.setBirthdate(LocalDate.now());
        dogRequestDto.setGender(Gender.MALE);
        dogRequestDto.setWeight(20.9);
        dogRequestDto.setNeuter(true);
        dogRequestDto.setDisease("알레르기 있음");
        dogRequestDto.setBreedId(1L);
        dogRequestDto.setFileURL("document/1.jpg");

        dogService.registerDog(user.get().getId(), dogRequestDto);
        List<Dog> result = dogRepository.findAll();
        Assertions.assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void findDog(){
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");

        DogRequestDto dogRequestDto1 = new DogRequestDto();
        dogRequestDto1.setName("바비");
        dogRequestDto1.setBirthdate(LocalDate.now());
        dogRequestDto1.setGender(Gender.MALE);
        dogRequestDto1.setWeight(20.9);
        dogRequestDto1.setNeuter(true);
        dogRequestDto1.setDisease("알레르기 있음");
        dogRequestDto1.setBreedId(1L);
        dogRequestDto1.setFileURL("document/1.jpg");

        DogRequestDto dogRequestDto2 = new DogRequestDto();
        dogRequestDto2.setName("뽀삐");
        dogRequestDto2.setBirthdate(LocalDate.now());
        dogRequestDto2.setGender(Gender.MALE);
        dogRequestDto2.setWeight(20.9);
        dogRequestDto2.setNeuter(true);
        dogRequestDto2.setDisease("알레르기 있음");
        dogRequestDto2.setBreedId(1L);
        dogRequestDto2.setFileURL("document/1.jpg");

        dogService.registerDog(user.get().getId(), dogRequestDto1);
        dogService.registerDog(user.get().getId(), dogRequestDto2);
        DogResponseDetailDto resultDog = dogService.getDogById(user.get().getId(),2L);
        Assertions.assertThat(resultDog.getName()).isEqualTo("뽀삐");
        
    }


}