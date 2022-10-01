package com.mtld.backend.dto.diary.walking;

import com.mtld.backend.entity.diary.Walking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * created by seongmin on 2022/09/19
 * updated by seongmin on 2022/10/01
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class WalkingDetailResponseDto {
    private Long id;
    private Double time;
    private Double distance;

    public static WalkingDetailResponseDto of(Walking walking) {
        return WalkingDetailResponseDto.builder()
                .id(walking.getId())
                .time(walking.getWalkingTime())
                .distance(walking.getDistance())
                .build();
    }
}
