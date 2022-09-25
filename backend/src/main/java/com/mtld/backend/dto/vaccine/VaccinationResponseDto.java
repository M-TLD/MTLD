package com.mtld.backend.dto.vaccine;

import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.entity.vaccine.Vaccination;
import com.mtld.backend.entity.vaccine.Vaccine;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/23
 */
@Data
@Builder
public class VaccinationResponseDto {

    private Long id;
    private Long dogId;
    private Long vaccineId;
    private LocalDate expectDate;

    public static VaccinationResponseDto of(Vaccination vaccination) {
        return VaccinationResponseDto.builder()
                .id(vaccination.getId())
                .dogId(vaccination.getDog().getId())
                .vaccineId(vaccination.getVaccine().getId())
                .expectDate(vaccination.getExpectDate())
                .build();
    }
}
