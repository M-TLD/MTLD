package com.mtld.backend.dto.vaccine;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * created by myeongseok on 2022/09/23
 */
@Data
@Builder
public class VaccinationUpdateRequestDto {

    @NotNull
    private Long id;

    @NotBlank(message = "예방 접종 예정 일자는 필수 입력값입니다.")
    private String expectDate;
}
