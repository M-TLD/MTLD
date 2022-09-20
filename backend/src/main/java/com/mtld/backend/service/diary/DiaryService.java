package com.mtld.backend.service.diary;

import com.mtld.backend.dto.diary.RecordRequestDto;
import com.mtld.backend.dto.diary.WalkingDetailRequestDto;
import com.mtld.backend.dto.diary.WalkingDetailResponseDto;
import com.mtld.backend.dto.diary.WalkingRequestDto;
import com.mtld.backend.entity.diary.Diary;
import com.mtld.backend.entity.diary.Record;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */
public interface DiaryService {

    void writeWalking(Long uid, WalkingRequestDto walkingDto);

    Long writeRecord(Long uid, RecordRequestDto recordDto, List<MultipartFile> images);

    WalkingDetailResponseDto getWalkingDetail(Long uid, WalkingDetailRequestDto dto);
}
