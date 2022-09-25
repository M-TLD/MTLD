package com.mtld.backend.entity.vaccine;

import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.util.ConvertDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/08
 * updated by myeongseok on 2022/09/23
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Vaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @ManyToOne
    @JoinColumn(name = "vaccine_id")
    private Vaccine vaccine;

    private LocalDate expectDate;

    @Builder
    public Vaccination(Dog dog, Vaccine vaccine, LocalDate expectDate) {
        this.dog = dog;
        this.vaccine = vaccine;
        this.expectDate = expectDate;
    }

    public void update(VaccinationUpdateRequestDto vaccinationUpdateRequestDto) {
        this.expectDate = ConvertDate.stringToDate(vaccinationUpdateRequestDto.getExpectDate());
    }
}
