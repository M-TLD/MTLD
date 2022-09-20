package com.mtld.backend.repository.dog;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.dog.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * created by seongmin on 2022/09/13
 * updated by seongmin on 2022/09/19
 */
public interface DogRepository extends JpaRepository<Dog, Long> {
    List<Dog> findByUser(User user);
    Optional<Dog> findByIdAndUser(Long id, User user);
}
