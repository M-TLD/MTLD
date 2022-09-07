package com.mtld.backend.entity;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

}
