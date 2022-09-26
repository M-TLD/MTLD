package com.mtld.backend.dto.medicine;

import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.medicine.TakingMedicine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/21
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TakingMedicineResponseDto {

    private Long id;
    private Long dogId;
    private Long medicineId;
    private LocalDate expectDate;

    public static TakingMedicineResponseDto of(TakingMedicine takingMedicine) {
        return TakingMedicineResponseDto.builder()
                .id(takingMedicine.getId())
                .dogId(takingMedicine.getDog().getId())
                .medicineId(takingMedicine.getMedicine().getId())
                .expectDate(takingMedicine.getExpectDate())
                .build();
    }
}
