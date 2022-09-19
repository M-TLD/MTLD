package com.mtld.backend.service;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.BreedRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * created by MyeongSeok on 2022/09/14
 * updated by MyeongSeok on 2022/09/16
 */
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DogServiceImpl implements DogService {
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    private final BreedRepository breedRepository;


    @Override
    @Transactional
    public void registerDog(Long uid, Long breedId, DogRequestDto dogRequestDto) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Breed breed = breedRepository.findById(breedId).orElseThrow(() -> new BadRequestException("유효하지 않은 품종입니다."));
        Dog dog = Dog.builder()
                .name(dogRequestDto.getName())
                .birthdate(dogRequestDto.getBirthdate())
                .gender(dogRequestDto.getGender())
                .weight(dogRequestDto.getWeight())
                .neuter(dogRequestDto.isNeuter())
                .breed(breed)
                .user(user).build();
        dog.writeDisease(dogRequestDto.getDisease());

        dogRepository.save(dog);
    }
}
