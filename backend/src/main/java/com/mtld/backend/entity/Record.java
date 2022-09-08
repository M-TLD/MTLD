package com.mtld.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/08
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Record extends Diary {

    @Column(columnDefinition = "TEXT")
    private String mainText;

    @OneToMany(mappedBy = "record", fetch = FetchType.LAZY)
    private List<UploadFile> uploadFiles = new ArrayList<>();

    @Builder
    public Record(LocalDateTime diaryDate, User user, String mainText) {
        super(diaryDate, user);
        this.mainText = mainText;
    }
}
