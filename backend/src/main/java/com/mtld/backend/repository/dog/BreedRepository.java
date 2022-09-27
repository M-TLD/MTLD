package com.mtld.backend.repository.dog;

import com.mtld.backend.entity.dog.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * created by myeongseok on 2022/09/16
 * updated by seongmin on 2022/09/27
 */
public interface BreedRepository extends JpaRepository<Breed, Long> {
    Optional<Breed> findByCode(String code);
}
