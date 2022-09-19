package com.mtld.backend.repository.dog;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
class DogRepositoryTest {

    @Autowired
    DogRepository dogRepository;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    void before() {
        User user = userRepository.save(User.builder()
                .name("테스터")
                .oauthId("test@gmail.com")
                .platform("KAKAO")
                .roleType(RoleType.USER)
                .build());

        Dog dog1 = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2021-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.FEMALE)
                .user(user)
                .neuter(false)
                .weight(10.3)
                .build());

        Dog dog2 = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2020-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.MALE)
                .user(user)
                .neuter(true)
                .weight(15.75)
                .build());
    }

    @Test
    @DisplayName("Dog 조회")
    void getDog() {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        List<Dog> result = dogRepository.findByUser(user.get());
        Assertions.assertThat(result.size()).isEqualTo(1);


    }

    @Test
    @DisplayName("Dog 삽입")
    void insertDog() {
        Optional<User> user = userRepository.findByOauthId("test@gmail.com");
        Dog dog3 = dogRepository.save((Dog.builder()
                .birthdate(LocalDate.parse("2020-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.MALE)
                .user(user.get())
                .neuter(true)
                .weight(15.75)
                .build()));

        Dog dog4 = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2020-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.MALE)
                .user(user.get())
                .neuter(true)
                .weight(15.75)
                .build());
        List<Dog> result = dogRepository.findAll();
        Assertions.assertThat(result.size()).isEqualTo(4);


    }
}