package com.mtld.backend.entity.diary;

import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Diary;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Record extends Diary {

    private String mainText;

    @OneToMany(mappedBy = "record", fetch = FetchType.LAZY)
    private List<UploadFile> uploadFiles = new ArrayList<>();

    @Builder
    public Record(LocalDate diaryDate, User user, String mainText, List<UploadFile> uploadFiles) {
        super(diaryDate, user);
        this.mainText = mainText;
        this.uploadFiles = uploadFiles;
    }
}
