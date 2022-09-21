package com.mtld.backend.service.diary;

import com.mtld.backend.dto.diary.DiaryResponseDto;
import com.mtld.backend.dto.diary.record.RecordDetailResponseDto;
import com.mtld.backend.dto.diary.record.RecordRequestDto;
import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.diary.Walking;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.repository.UploadFileRepository;
import com.mtld.backend.repository.diary.DiaryRepository;
import com.mtld.backend.repository.diary.RecordRepository;
import com.mtld.backend.repository.diary.WalkingRepository;
import com.mtld.backend.repository.dog.DogRepository;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

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
    RecordRepository recordRepository;
    @Autowired
    UploadFileRepository uploadFileRepository;
    @Autowired
    WalkingRepository walkingRepository;
    @Autowired
    DogRepository dogRepository;

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
        assertThat(recordRepository.findAll().size()).isEqualTo(1);
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

        RecordDetailResponseDto recordDetailByDate = diaryService.getRecordDetailByDate(user.getId(), "2020-09-19");
        assertThat(recordDetailByDate.getImageCount()).isEqualTo(0);
        assertThat(recordDetailByDate.getMainText()).isEqualTo("오늘 날씨 좋아2");
    }

    @Test
    @DisplayName("일지(Record) 삭제")
    void deleteRecord() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Record record = recordRepository.save(new Record(ConvertDate.stringToDate("2020-09-19"), user, "오늘 날씨 좋아요. 산책 좋아요"));
        record.addUploadFile(new UploadFile("사진1", "https://image/1"));
        record.addUploadFile(new UploadFile("사진2", "https://image/2"));
        record.addUploadFile(new UploadFile("사진3", "https://image/3"));
        assertThat(recordRepository.findAll().size()).isEqualTo(1);
        List<UploadFile> uploadFiles = uploadFileRepository.findAll();
        assertThat(uploadFiles.size()).isEqualTo(3);

        diaryService.deleteRecord(user.getId(), record.getId());
        assertThat(recordRepository.findAll().size()).isEqualTo(0);
        assertThat(uploadFileRepository.findAll().size()).isEqualTo(0);

    }

    @Test
    @DisplayName("내 다이어리 날짜 전체 조회")
    void getMyDiaryDate() {
        User user = userRepository.findByOauthId("test@gmail.com").get();
        Dog dog1 = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2021-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.FEMALE)
                .user(user)
                .neuter(false)
                .weight(10.3)
                .build());

        Dog dog2 = dogRepository.save(Dog.builder()
                .birthdate(LocalDate.parse("2020-05-10", DateTimeFormatter.ISO_DATE))
                .breed(null)
                .gender(Gender.MALE)
                .user(user)
                .neuter(true)
                .weight(15.75)
                .build());

        Record record = recordRepository.save(new Record(ConvertDate.stringToDate("2020-09-19"), user, "오늘 날씨 좋아요. 산책 좋아요"));
        record.addUploadFile(new UploadFile("사진1", "https://image/1"));
        record.addUploadFile(new UploadFile("사진2", "https://image/2"));
        record.addUploadFile(new UploadFile("사진3", "https://image/3"));
        recordRepository.save(new Record(ConvertDate.stringToDate("2020-09-05"),user, "손. 코. 돌아. 점프. 먹어. 기다려."));
        walkingRepository.save(new Walking(ConvertDate.stringToDate("2020-09-19"),user,1.5,2.3,dog1));
        walkingRepository.save(new Walking(ConvertDate.stringToDate("2020-09-18"),user,1.45,2.1,dog2));

        DiaryResponseDto myDiaryDate = diaryService.getMyDiaryDate(user.getId());
        assertThat(myDiaryDate.getRecordDateList().size()).isEqualTo(2);
        assertThat(myDiaryDate.getWalkingDateList().size()).isEqualTo(2);

    }
}