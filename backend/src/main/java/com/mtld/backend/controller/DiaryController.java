package com.mtld.backend.controller;

import com.mtld.backend.dto.diary.RecordRequestDto;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.service.diary.DiaryService;
import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

/**
 * created by seongmin on 2022/09/19
 * updated by seongmin on 2022/09/20
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/diary")
public class DiaryController {
    private final UserService userService;
    private final DiaryService diaryService;

    @PostMapping("/record")
    public ResponseEntity<?> writeRecord(@RequestPart(value = "record") @Valid RecordRequestDto requestDto,
                                         @RequestPart(value = "image", required = false) List<MultipartFile> multipartFiles) {

        diaryService.writeRecord(userService.getMyInfoSecret().getId(), requestDto, multipartFiles);
        return ResponseEntity.status(CREATED).build();
    }
}
