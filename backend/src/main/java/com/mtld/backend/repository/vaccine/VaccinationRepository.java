package com.mtld.backend.repository.vaccine;

import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.vaccine.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * created by myeongseok on 2022/09/19
 */
public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {
    List<Vaccination> findByDog(Dog dog);
}
