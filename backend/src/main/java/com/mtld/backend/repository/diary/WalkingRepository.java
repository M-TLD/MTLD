package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.diary.Walking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalkingRepository extends JpaRepository<Walking, Long> {
}
