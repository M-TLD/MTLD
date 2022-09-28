package com.mtld.backend.service.dog;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.repository.dog.DogRepository;

import java.util.List;


/**
 * created by myeongseok on 2022/09/16
 * updated by myeongseok on 2022/09/20
 */
public interface DogService {

    Dog getDog(Long dogId);

    List<DogResponseDetailDto> getDogByUser(Long userId);

    DogResponseDetailDto getDogById(Long uid, Long id);

    void registerDog(Long userId, DogRequestDto dogRequestDto);

    void updateDog(Long userId, DogUpdateRequestDto dogUpdateRequestDto);

    void deleteDog(Long userId, Long dogId);
}
