package com.mtld.backend.dto.medicine;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * created by myeongseok on 2022/09/21
 */
@Data
@Builder
public class TakingMedicineRequestDto {
    @NotNull(message = "반려견 id는 필수입니다.")
    private Long dogId;

    @NotNull(message = "복용 약 id는 필수입니다.")
    private Long medicineId;

    @NotBlank
    private String expectDate;
}
