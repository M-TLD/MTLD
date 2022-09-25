package com.mtld.backend.dto.dog;

import com.mtld.backend.entity.dog.Gender;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * created by myeongseok on 2022/09/19
 * updated by myeongseok on 2022/09/20
 */
@Data
@Builder
public class DogRequestDto {
    @NotBlank(message = "반려견 이름은 필수 입력값입니다.")
    private String name;

    @NotBlank(message = "반려견 생일은 필수 입력값입니다.")
    private String birthdate;

    @NotNull(message = "반려견 성별은 필수 입력값입니다.")
    private Gender gender;

    @NotNull(message = "반려견 몸무게는 필수 입력값입니다.")
    private Double weight;

    @NotNull(message = "반려견 중성화 여부는 필수 입력값입니다.")
    private boolean neuter;

    private String disease;

    @NotNull(message = "품종은 필수 입력값입니다.")
    private Long breedId;

    private String fileURL;

}
