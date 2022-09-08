package com.mtld.backend.entity;

import com.mtld.backend.converter.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    private LocalDateTime birthdate;

    // 성별

    private Double weight;

    @Convert(converter = BooleanToYNConverter.class)
    private boolean neuter;

    private String characteristic;

    public Abandon(String name, LocalDateTime birthdate, Double weight, boolean neuter, String characteristic) {
        this.name = name;
        this.birthdate = birthdate;
        this.weight = weight;
        this.neuter = neuter;
        this.characteristic = characteristic;
    }
}
