package com.mtld.backend.repository.vaccine;

import com.mtld.backend.entity.vaccine.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by myeongseok on 2022/09/23
 */
public interface VaccineRepositpry extends JpaRepository<Vaccine, Long> {
    Vaccine findByName(String name);
}
