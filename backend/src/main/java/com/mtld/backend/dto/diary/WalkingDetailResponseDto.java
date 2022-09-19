package com.mtld.backend.dto.diary;

import com.mtld.backend.entity.diary.Walking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * created by seongmin on 2022/09/19
 */
@AllArgsConstructor
@Builder
@Getter
public class WalkingDetailResponseDto {
    private Double time;
    private Double distance;

    public static WalkingDetailResponseDto of(Walking walking) {
        return WalkingDetailResponseDto.builder()
                .time(walking.getWalkingTime())
                .distance(walking.getDistance())
                .build();
    }
}
