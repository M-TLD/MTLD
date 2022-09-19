package com.mtld.backend.repository.medicine;

import com.mtld.backend.entity.medicine.TakingMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by myeongseok on 2022/09/19
 */
public interface TakingMedicineRepository extends JpaRepository<TakingMedicine, Long> {
        }
