package com.mtld.backend.repository.medicine;

import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.medicine.TakingMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * created by myeongseok on 2022/09/19
 * updated by myeongseok on 2022/10/03
 */
public interface TakingMedicineRepository extends JpaRepository<TakingMedicine, Long> {
    List<TakingMedicine> findByDog(Dog dog);

    TakingMedicine findByDogAndMedicine(Dog dog, Medicine medicine);
}
