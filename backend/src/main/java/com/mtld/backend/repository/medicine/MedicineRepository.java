package com.mtld.backend.repository.medicine;

import com.mtld.backend.entity.medicine.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by myeongseok on 2022/09/22
 */
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Medicine findByName(String name);
}
