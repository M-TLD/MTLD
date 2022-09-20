package com.mtld.backend.repository.vaccine;

import com.mtld.backend.entity.vaccine.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by myeongseok on 2022/09/19
 */
public interface VacinnationRepository extends JpaRepository<Vaccination, Long> {
}
