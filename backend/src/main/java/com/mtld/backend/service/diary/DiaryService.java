package com.mtld.backend.service.diary;

import com.mtld.backend.dto.diary.record.RecordDetailResponseDto;
import com.mtld.backend.dto.diary.record.RecordRequestDto;
import com.mtld.backend.dto.diary.walking.WalkingDetailRequestDto;
import com.mtld.backend.dto.diary.walking.WalkingDetailResponseDto;
import com.mtld.backend.dto.diary.walking.WalkingRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * created by seongmin on 2022/09/08
 * updated by seongmin on 2022/09/13
 */
public interface DiaryService {

    void writeWalking(Long uid, WalkingRequestDto walkingDto);
    WalkingDetailResponseDto getWalkingDetail(Long uid, WalkingDetailRequestDto dto);
    Long writeRecord(Long uid, RecordRequestDto recordDto, List<MultipartFile> images);
    RecordDetailResponseDto getRecordDetailByDate(Long uid, String date);
    RecordDetailResponseDto getRecordDetailById(Long uid, Long id);
}