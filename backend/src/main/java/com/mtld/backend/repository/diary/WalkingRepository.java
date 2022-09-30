package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/21
 */
public interface WalkingRepository extends JpaRepository<Walking, Long> {
    Optional<Walking> findByDiaryDateBetweenAndDog(LocalDate from, LocalDate to, Dog dog);
    List<Walking> findByUser(User user);
}
