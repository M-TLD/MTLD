package com.mtld.backend.service.dog;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Dog;

public interface DogService {
    void registerDog(Long uid, DogRequestDto dogRequestDto);

    DogResponseDetailDto getDogById(Long uid, Long id);

}
