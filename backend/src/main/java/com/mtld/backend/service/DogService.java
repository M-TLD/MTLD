package com.mtld.backend.service;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.entity.dog.Breed;

public interface DogService {
    void registerDog(Long uid, Long breedId, DogRequestDto dogRequestDto);
}
