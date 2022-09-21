package com.mtld.backend.service.dog;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.exception.AuthException;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.dog.BreedRepository;
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
    public void registerDog(Long uid, DogRequestDto dogRequestDto) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Breed breed = breedRepository.findById(dogRequestDto.getBreedId()).orElseThrow(() -> new BadRequestException("유효하지 않은 품종입니다."));
        Dog dog = Dog.builder()
                .name(dogRequestDto.getName())
                .birthdate(dogRequestDto.getBirthdate())
                .gender(dogRequestDto.getGender())
                .weight(dogRequestDto.getWeight())
                .neuter(dogRequestDto.isNeuter())
                .breed(breed)
                .user(user).
                build();
        dog.writeDisease(dogRequestDto.getDisease());

        dogRepository.save(dog);
    }

    @Override
    public DogResponseDetailDto getDogById(Long uid, Long id) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(id).orElseThrow(() -> new BadRequestException("해당 강아지가 없습니다."));
        if (!dog.getUser().equals(user)) {
            throw new AuthException("권한이 없습니다.");
        }
        return DogResponseDetailDto.of(dog);
    }


}