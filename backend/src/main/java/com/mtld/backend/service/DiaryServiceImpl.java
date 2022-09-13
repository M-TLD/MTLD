package com.mtld.backend.service;

import com.mtld.backend.dto.diary.RecordRequestDto;
import com.mtld.backend.dto.diary.WalkingRequestDto;
import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.exception.BadRequestException;
import com.mtld.backend.repository.DogRepository;
import com.mtld.backend.repository.UploadFileRepository;
import com.mtld.backend.repository.diary.RecordRepository;
import com.mtld.backend.repository.diary.WalkingRepository;
import com.mtld.backend.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/13
 */
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DiaryServiceImpl implements DiaryService {

    private final WalkingRepository walkingRepository;
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final DogRepository dogRepository;
    private final UploadFileRepository uploadFileRepository;

    @Override
    @Transactional
    public void writeWalking(Long uid, WalkingRequestDto walkingDto) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        Dog dog = dogRepository.findById(walkingDto.getDogId()).orElseThrow(() -> new BadRequestException("유효하지 않은 반려견입니다."));
        Walking walking = Walking.builder()
                .walkingTime(walkingDto.getWalkingTime())
                .diaryDate(walkingDto.getDiaryDate())
                .distance(walkingDto.getDistance())
                .dog(dog)
                .user(user)
                .build();
        walkingRepository.save(walking);
    }

    @Override
    @Transactional
    public void writeRecord(Long uid, RecordRequestDto recordDto, List<MultipartFile> images) {
        User user = userRepository.findById(uid).orElseThrow(() -> new BadRequestException("유효하지 않은 사용자입니다."));
        List<UploadFile> uploadFiles = new ArrayList<>();
//        uploadFileRepository.saveAll(uploadFiles);
        // s3 에 images 저장 만들기
        Record record = Record.builder()
                .user(user)
                .diaryDate(recordDto.getDiaryDate())
                .mainText(recordDto.getMainText())
                .uploadFiles(uploadFiles)
                .build();
        recordRepository.save(record);
    }
}
