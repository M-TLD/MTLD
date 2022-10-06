package com.mtld.backend.dto.vaccine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * created by myeongseok on 2022/09/23
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VaccinationRequestDto {
    @NotNull(message = "반려견 id는 필수입니다.")
    private Long dogId;

    @NotNull(message = "복용 약 id는 필수입니다.")
    private Long vaccineId;

    @NotBlank
    private String expectDate;
}
