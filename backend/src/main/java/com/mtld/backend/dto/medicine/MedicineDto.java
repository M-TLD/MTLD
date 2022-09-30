package com.mtld.backend.dto.medicine;

import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.vaccine.Vaccine;
import lombok.Builder;
import lombok.Data;

/**
 * created by myeongseok on 2022/09/30
 */

@Data
@Builder
public class MedicineDto {
    private Long id;
    private String name;

    public static MedicineDto of(Medicine medicine) {
        return MedicineDto.builder().
                id(medicine.getId()).
                name(medicine.getName()).
                build();
    }
}