package com.mtld.backend.repository;

import com.mtld.backend.entity.dog.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by seongmin on 2022/09/13
 */
public interface DogRepository extends JpaRepository<Dog, Long> {
}
