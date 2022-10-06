package com.mtld.backend.dto.vaccine;

import com.mtld.backend.entity.vaccine.Vaccine;
import lombok.Builder;
import lombok.Data;

/**
 * created by myeongseok on 2022/09/30
 */
@Data
@Builder
public class VaccineDto {
    private Long id;
    private String name;

    public static VaccineDto of(Vaccine vaccine) {
        return VaccineDto.builder().
                id(vaccine.getId()).
                name(vaccine.getName()).
                build();
    }
}
