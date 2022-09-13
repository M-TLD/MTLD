package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.diary.Record;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by seongmin on 2022/09/08
 */
public interface RecordRepository extends JpaRepository<Record, Long> {
}
