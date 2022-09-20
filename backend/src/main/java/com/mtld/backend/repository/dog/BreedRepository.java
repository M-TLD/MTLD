package com.mtld.backend.repository.dog;

import com.mtld.backend.entity.diary.Diary;
import com.mtld.backend.entity.dog.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by myeongseok on 2022/09/16
 */
public interface BreedRepository extends JpaRepository<Breed, Long> {
}
