package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/20
 */
public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<Record> findByDiaryDateBetweenAndUser(LocalDate from, LocalDate to, User user);

}
