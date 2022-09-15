package com.mtld.backend.entity;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.entity.auth.RoleType;
import com.mtld.backend.entity.diary.Diary;
import com.mtld.backend.entity.dog.Dog;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/07
 * updated by seongmin on 2022/09/14
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "USERS")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oauthId;

    private String platform;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Dog> dogs = new ArrayList<>();

    @Convert(converter = BooleanToYNConverter.class)
    private boolean isDeleted;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Diary> diaries = new ArrayList<>();

    public void withdraw() {
        this.isDeleted = true;
    }

    @Builder
    public User(String oauthId, String platform, String name, String nickname, RoleType roleType) {
        this.oauthId = oauthId;
        this.platform = platform;
        this.name = name;
        this.nickname = nickname;
        this.roleType = roleType;
    }
}
