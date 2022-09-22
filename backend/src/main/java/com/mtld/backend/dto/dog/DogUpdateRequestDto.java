package com.mtld.backend.dto.dog;

import com.mtld.backend.entity.dog.Gender;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/19
 * updated by myeongseok on 2022/09/20
 */
@Data
@Builder
public class DogUpdateRequestDto {

    @NotNull
    private Long id;

    @NotNull(message = "반려견 몸무게는 필수 입력값입니다.")
    private Double weight;

    @NotNull(message = "반려견 중성화 여부는 필수 입력값입니다.")
    private boolean neuter;

    private String disease;

    private String fileURL;
}
