package com.mtld.backend.dto.diary;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * created by seongmin on 2022/09/19
 */
@Getter
@AllArgsConstructor
public class WalkingDetailRequestDto {
    @NotNull(message = "강아지 아이디는 필수 입력값 입니다.")
    private Long dogId;
    @NotNull(message = "날짜는 필수 입력값 입니다.")
    private LocalDate diaryDate;
}
