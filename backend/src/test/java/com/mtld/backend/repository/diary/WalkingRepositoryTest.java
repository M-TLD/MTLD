package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
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

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class WalkingRepositoryTest {

    @Autowired
    WalkingRepository walkingRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DogRepository dogRepository;

    @BeforeEach
    void before() {
        User user = userRepository.save(User.builder()
                .name("테스터")
                .oauthId("test@gmail.com")
                .platform("KAKAO")
                .roleType(RoleType.USER)
                .build());

        Dog dog = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2021-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.FEMALE)
                .user(user)
                .neuter(false)
                .weight(10.3)
                .build());
        Walking walking = walkingRepository.save(Walking.builder()
                .diaryDate(LocalDate.parse("2022-09-10", DateTimeFormatter.ISO_DATE))
                .distance(2.3)
                .walkingTime(1.5)
                .user(user)
                .dog(dog)
                .build());
    }

    @Test
    @DisplayName("산책일지 조회")
    void getWalkingDetail() {
        List<Dog> dogs = dogRepository.findAll();
        Dog dog = dogs.get(0);
        Optional<Walking> result = walkingRepository.findByDiaryDateBetweenAndDog(LocalDate.parse("2022-09-10", DateTimeFormatter.ISO_DATE), LocalDate.parse("2022-09-10", DateTimeFormatter.ISO_DATE), dog);
        assertThat(result.get().getId()).isEqualTo(1);
    }
}