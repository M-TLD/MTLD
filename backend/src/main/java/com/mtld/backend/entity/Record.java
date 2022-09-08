package com.mtld.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Record extends Diary {

    @Column(columnDefinition = "TEXT")
    private String mainText;

    @Builder
    public Record(LocalDateTime diaryDate, User user, String mainText) {
        super(diaryDate, user);
        this.mainText = mainText;
    }
}
