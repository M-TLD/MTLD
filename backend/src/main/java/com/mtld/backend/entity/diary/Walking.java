package com.mtld.backend.entity.diary;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Diary;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Walking extends Diary {

    private Double walkingTime;

    private Double distance;

    @Builder
    public Walking(LocalDateTime diaryDate, User user, Double walkingTime, Double distance) {
        super(diaryDate, user);
        this.walkingTime = walkingTime;
        this.distance = distance;
    }
}
