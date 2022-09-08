package com.mtld.backend.entity.vaccine;

import com.mtld.backend.entity.dog.Dog;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/08
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Vaccination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;

    @Enumerated(EnumType.STRING)
    private Vaccine vaccine;

    private LocalDate pastDate;

    private LocalDate expectDate;
}
