package com.mtld.backend.dto.medicine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * created by myeongseok on 2022/09/21
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TakingMedicineUpdateRequestDto {

    @NotNull
    private Long id;

    @NotBlank(message = "약 복용 예정 일자는 필수 입력값입니다.")
    private String expectDate;
}
