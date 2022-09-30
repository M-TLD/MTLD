package com.mtld.backend.dto.diary.record;

import com.mtld.backend.entity.diary.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/20
 * updated by seongmin on 2022/09/29
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class RecordDetailResponseDto {
    private Long id;
    private int imageCount;
    private List<Image> images = new ArrayList<>();
    private String mainText;

    public static RecordDetailResponseDto of(Record record) {
        RecordDetailResponseDto result = new RecordDetailResponseDto();
        record.getUploadFiles().forEach(file -> {
            result.images.add(new Image(file.getName(), file.getUrl()));
        });
        result.id = record.getId();
        result.imageCount = record.getUploadFiles().size();
        result.mainText = record.getMainText();
        return result;
    }

    @Getter
    @AllArgsConstructor
    private static class Image {
        private String name;
        private String url;
    }
}
