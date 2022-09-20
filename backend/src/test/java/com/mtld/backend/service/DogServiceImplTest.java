package com.mtld.backend.service;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest
@Transactional
class DogServiceImplTest {
    @Autowired
    DogRepository dogR;
    @Autowired
    UserRepository userR;

    @Test
    void insertDog(){
        User user = userR.save(new User("test@naver.com", "KAKAO", "테스터", null, RoleType.USER));
        Dog dog = Dog.builder()
                .birthdate(LocalDate.now())
                .gender(Gender.MALE)
                .name("바비")
                .weight(9.5)
                .user(user)
                .build();
        Dog saveDog = dogR.save(dog);
        System.out.println(saveDog);
    }


}