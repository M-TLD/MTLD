package com.mtld.backend.service.dog;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.dog.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;


import java.io.FileInputStream;
import java.io.IOException;
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
        userRepository.save(User.builder().name("테스터").oauthId("test@gmail.com").platform("KAKAO").roleType(RoleType.USER).build());
        breedRepository.save(new Breed("0000", "말티즈"));
    }

    @Test
    @DisplayName("반려견 id 조회 & 반려견 등록")
    void registerDog() throws IOException {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        DogRequestDto dogRequestDto2 = DogRequestDto.builder().name("뽀삥").birthdate("2020-02-02").gender(Gender.FEMALE).weight(15.9).neuter(false).code(breedRepository.findAll().get(0).getCode()).build();
        MockMultipartFile file = new MockMultipartFile("image", "test.png", "image/png", new FileInputStream("C:\\Users\\SSAFY\\Downloads\\z.png"));
        dogService.registerDog(user.get().getId(), dogRequestDto, file);
        dogService.registerDog(user.get().getId(), dogRequestDto2, file);

        List<Dog> result = dogRepository.findAll();
        Assertions.assertThat(result.size()).isEqualTo(2);
    }

    @Test
    @DisplayName("반려견 아이디&유저 아이디로 조회")
    void findDog() throws IOException {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        DogRequestDto dogRequestDto2 = DogRequestDto.builder().name("뽀삥").birthdate("2020-02-02").gender(Gender.FEMALE).weight(15.9).neuter(false).code(breedRepository.findAll().get(0).getCode()).build();
        MockMultipartFile file = new MockMultipartFile("image", "test.png", "image/png", new FileInputStream("C:\\Users\\SSAFY\\Downloads\\z.png"));
        dogService.registerDog(user.get().getId(), dogRequestDto, file);
        dogService.registerDog(user.get().getId(), dogRequestDto2, file);

        DogResponseDetailDto resultDog = dogService.getDogById(user.get().getId(), 2L);
        Assertions.assertThat(resultDog.getName()).isEqualTo("뽀삥");

    }

    @Test
    @DisplayName("반려견 정보 수정")
    void updateDog() throws IOException {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        DogRequestDto dogRequestDto2 = DogRequestDto.builder().name("뽀삥").birthdate("2020-02-02").gender(Gender.FEMALE).weight(15.9).neuter(false).code(breedRepository.findAll().get(0).getCode()).build();
        MockMultipartFile file = new MockMultipartFile("image", "test.png", "image/png", new FileInputStream("C:\\Users\\SSAFY\\Downloads\\z.png"));
        dogService.registerDog(user.get().getId(), dogRequestDto, file);
        dogService.registerDog(user.get().getId(), dogRequestDto2, file);
        DogUpdateRequestDto dogUpdateRequestDto = DogUpdateRequestDto.builder().id(2L).neuter(true).weight(25.1).build();
//        dogService.updateDog(user.get().getId(), dogUpdateRequestDto);

        DogResponseDetailDto resultDog = dogService.getDogById(user.get().getId(), 2L);
        Assertions.assertThat(resultDog.getWeight()).isEqualTo(25.1);
        Assertions.assertThat(resultDog.isNeuter()).isEqualTo(true);
    }

    @Test
    @DisplayName("반려견 삭제")
    void deleteDog() throws IOException {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        DogRequestDto dogRequestDto2 = DogRequestDto.builder().name("뽀삥").birthdate("2020-02-02").gender(Gender.FEMALE).weight(15.9).neuter(false).code(breedRepository.findAll().get(0).getCode()).build();
        MockMultipartFile file = new MockMultipartFile("image", "test.png", "image/png", new FileInputStream("C:\\Users\\SSAFY\\Downloads\\z.png"));
        dogService.registerDog(user.get().getId(), dogRequestDto, file);
        dogService.registerDog(user.get().getId(), dogRequestDto2, file);
        dogService.deleteDog(user.get().getId(), dogService.getDog(1L).getId());

        Assertions.assertThat(dogRepository.findAll().size()).isEqualTo(1);


    }

    @Test
    @DisplayName("유저 정보에 따른 반려견 반환")
    void getDogByUser() throws IOException {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        DogRequestDto dogRequestDto = DogRequestDto.builder().name("바비").birthdate("2020-02-02").gender(Gender.MALE).weight(20.9).neuter(true).code(breedRepository.findAll().get(0).getCode()).build();
        DogRequestDto dogRequestDto2 = DogRequestDto.builder().name("뽀삥").birthdate("2020-02-02").gender(Gender.FEMALE).weight(15.9).neuter(false).code(breedRepository.findAll().get(0).getCode()).build();
        MockMultipartFile file = new MockMultipartFile("image", "test.png", "image/png", new FileInputStream("C:\\Users\\SSAFY\\Downloads\\z.png"));
        dogService.registerDog(user.get().getId(), dogRequestDto, file);
        dogService.registerDog(user.get().getId(), dogRequestDto2, file);
        List<DogResponseDetailDto> result = dogService.getDogByUser(user.get().getId());
        Assertions.assertThat(result.size()).isEqualTo(2);
    }


}