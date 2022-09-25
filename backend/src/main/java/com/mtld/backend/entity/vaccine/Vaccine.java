package com.mtld.backend.entity.vaccine;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * created by myeongseok on 2022/09/08
 * updated by myeongseok on 2022/09/23
 */

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    public Vaccine(String name) {
        this.name = name;
    }

}