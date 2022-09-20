package com.mtld.backend.service.diary;

import com.mtld.backend.dto.diary.RecordDetailRequestDto;
import com.mtld.backend.dto.diary.RecordDetailResponseDto;
import com.mtld.backend.dto.diary.RecordRequestDto;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.repository.diary.DiaryRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * created by seongmin on 2022/09/20
 */
@SpringBootTest
@Transactional
class DiaryServiceImplTest {

    @Autowired
    DiaryService diaryService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DiaryRepository diaryRepository;

    @BeforeEach
    void before() {
        userRepository.save(User.builder()
                .name("테스터")
                .oauthId("test@gmail.com")
                .platform("KAKAO")
                .roleType(RoleType.USER)
                .build());

    }

    @Test
    @DisplayName("일지(Record)작성")
    void writeRecord() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        diaryService.writeRecord(user.getId(),
                new RecordRequestDto("2020-09-19", "오늘 날씨 좋아"), null);
        assertThat(diaryRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("일지(Record) 날짜로 조회")
    void getRecordDetailByDate() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        diaryService.writeRecord(user.getId(),
                new RecordRequestDto("2020-09-20", "오늘 날씨 좋아1"), null);

        diaryService.writeRecord(user.getId(),
                new RecordRequestDto("2020-09-19", "오늘 날씨 좋아2"), null);

        diaryService.writeRecord(user.getId(),
                new RecordRequestDto("2020-09-18", "오늘 날씨 좋아3"), null);

        RecordDetailResponseDto recordDetailByDate = diaryService.getRecordDetailByDate(user.getId(),"2020-09-19");
        assertThat(recordDetailByDate.getImageCount()).isEqualTo(0);
        assertThat(recordDetailByDate.getMainText()).isEqualTo("오늘 날씨 좋아2");
    }

}