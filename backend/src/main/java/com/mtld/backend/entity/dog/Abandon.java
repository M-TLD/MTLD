package com.mtld.backend.entity.dog;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * created by seongmin on 2022/09/08
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Abandon extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Double weight;

    @Convert(converter = BooleanToYNConverter.class)
    private boolean neuter;

    private String characteristic;

    public Abandon(String name, LocalDate birthdate, Double weight, boolean neuter, String characteristic) {
        this.name = name;
        this.birthdate = birthdate;
        this.weight = weight;
        this.neuter = neuter;
        this.characteristic = characteristic;
    }
}
