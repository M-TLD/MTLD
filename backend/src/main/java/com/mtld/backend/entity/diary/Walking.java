package com.mtld.backend.entity.diary;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Diary;
import com.mtld.backend.entity.dog.Dog;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Walking extends Diary {

    private Double walkingTime;

    private Double distance;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @Builder
    public Walking(LocalDate diaryDate, User user, Double walkingTime, Double distance, Dog dog) {
        super(diaryDate, user);
        this.walkingTime = walkingTime;
        this.distance = distance;
        this.dog = dog;
    }
}
