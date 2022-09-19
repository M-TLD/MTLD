package com.mtld.backend.repository.dog;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.dog.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * created by seongmin on 2022/09/13
 */
public interface DogRepository extends JpaRepository<Dog, Long> {

    List<Dog> findByUser(User user);
}
