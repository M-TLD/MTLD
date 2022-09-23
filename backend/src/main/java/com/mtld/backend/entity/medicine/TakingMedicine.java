package com.mtld.backend.entity.medicine;

import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
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
public class TakingMedicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    private LocalDate expectDate;

    @Builder
    public TakingMedicine(Dog dog, Medicine medicine, LocalDate expectDate) {
        this.dog = dog;
        this.medicine = medicine;
        this.expectDate = expectDate;
    }

    public void update(TakingMedicineUpdateRequestDto takingMedicineUpdateRequestDto) {
        this.expectDate = ConvertDate.stringToDate(takingMedicineUpdateRequestDto.getExpectDate());
    }
}
