package com.mtld.backend.dto.diary.record;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

/**
 * created by seongmin on 2022/09/20
 */
@Getter
@AllArgsConstructor
public class RecordDetailRequestDto {
    @NotBlank(message = "날짜는 필수 입력값 입니다.")
    private String diaryDate;
}
