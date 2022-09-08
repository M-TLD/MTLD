package com.mtld.backend.entity.diary;

import com.mtld.backend.entity.BaseEntity;
import com.mtld.backend.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public abstract class Diary extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime diaryDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Diary(LocalDateTime diaryDate, User user) {
        this.diaryDate = diaryDate;
        this.user = user;
    }
    /**
     * 연관관계 편의 메소드 필요한가??
     */
//    public void setUser(User user) {
//        if (this.user != null) {
//            this.user.getDiaries().remove(this);
//        }
//        this.user = user;
//        user.getDiaries().add(this);
//    }
}
