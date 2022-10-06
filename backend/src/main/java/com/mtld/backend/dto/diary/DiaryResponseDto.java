package com.mtld.backend.dto.diary;

import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.diary.Walking;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/21
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DiaryResponseDto {
    private List<LocalDate> recordDateList = new ArrayList<>();
    private List<LocalDate> walkingDateList = new ArrayList<>();

    public static DiaryResponseDto of(List<Record> records, List<Walking> walkings) {
        DiaryResponseDto result = new DiaryResponseDto();
        records.forEach(record -> {
            result.recordDateList.add(record.getDiaryDate());
        });
        walkings.forEach(walking -> {
            result.walkingDateList.add(walking.getDiaryDate());
        });
        return result;
    }
}
