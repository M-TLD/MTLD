package com.mtld.backend.entity.medicine;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/08
 * updated by myeongseok on 2022/09/21
 */

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    public Medicine(String name) {
        this.name = name;
    }

}
