package com.mtld.backend.entity.diary;

import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Diary;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/20
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Record extends Diary {

//    @Column(length = 40000)
    private String mainText;

    @OneToMany(mappedBy = "record", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UploadFile> uploadFiles = new ArrayList<>();

    @Builder
    public Record(LocalDate diaryDate, User user, String mainText) {
        super(diaryDate, user);
        this.mainText = mainText;
    }

    public void addUploadFile(UploadFile uploadFile) {
        this.uploadFiles.add(uploadFile);
        if (uploadFile.getRecord() != this) {
            uploadFile.setRecord(this);
        }
    }
}
