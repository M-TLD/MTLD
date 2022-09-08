package com.mtld.backend.entity;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/07
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

    @Convert(converter = BooleanToYNConverter.class)
    private boolean isDeleted;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Diary> diaries = new ArrayList<>();

    public void withdraw() {
        this.isDeleted = true;
    }

    @Builder
    public User(String oauthId, String platform, String name, String nickname) {
        this.oauthId = oauthId;
        this.platform = platform;
        this.name = name;
        this.nickname = nickname;
    }
}
