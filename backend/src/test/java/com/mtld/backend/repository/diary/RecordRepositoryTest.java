package com.mtld.backend.repository.diary;

import com.mtld.backend.entity.User;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.repository.user.UserRepository;
import com.mtld.backend.util.ConvertDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * created by seongmin on 2022/09/20
 */
@SpringBootTest
@Transactional
class RecordRepositoryTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RecordRepository recordRepository;

    @Test
    @DisplayName("날짜로 다이어리(일지) 조회")
    public void getRecord() {
        User user = userRepository.save(User.builder()
                .name("테스터")
                .oauthId("test@gmail.com")
                .platform("KAKAO")
                .roleType(RoleType.USER)
                .build());

        LocalDate date = ConvertDate.stringToDate("2022-09-19");
        Record record = recordRepository.save(Record.builder()
                .diaryDate(date)
                .user(user)
                .mainText("오늘 날씨 좋아")
                .build());

        assertThat(recordRepository.findByDiaryDateBetweenAndUser(date, date, user).get()).isEqualTo(record);
    }
}