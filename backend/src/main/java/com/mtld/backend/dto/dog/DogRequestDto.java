package com.mtld.backend.dto.dog;

import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Gender;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DogRequestDto {
    @NotBlank(message = "반려견 이름은 필수 입력값입니다.")
    private String name;
    @NotNull(message = "반려견 생일은 필수 입력값입니다.")
    private LocalDate birthdate;
    @NotNull(message = "반려견 성별은 필수 입력값입니다.")
    private Gender gender;
    @NotNull(message = "반려견 몸무게는 필수 입력값입니다.")
    private Double weight;
    @NotNull(message = "반려견 중성화 여부는 필수 입력값입니다.")
    private boolean neuter;

    private String disease;
    @NotBlank(message = "품종은 필수 입력값입니다.")
    private String breedName;

}
