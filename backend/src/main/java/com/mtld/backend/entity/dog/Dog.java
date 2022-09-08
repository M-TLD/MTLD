package com.mtld.backend.entity.dog;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.entity.*;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.entity.vaccine.Vaccination;
import com.nimbusds.openid.connect.sdk.claims.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/08
 */

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Dog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDateTime birthdate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private float weight;

    @Convert(converter = BooleanToYNConverter.class)
    private boolean neuter;

    private String disease;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @OneToMany(mappedBy = "dog")
    private List<TakingMedicine> takingMedicines = new ArrayList<>();

    @OneToMany(mappedBy = "dog")
    private List<Vaccination> vaccinations = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public void withdrawNeuter() {
        this.neuter = true;
    }

    @Builder
    public Dog(String name, LocalDateTime birthdate, Gender gender, float weight) {
        this.name = name;
        this.birthdate = birthdate;
        this.gender = gender;
        this.weight = weight;
    }

    public void writeDisease(String disease) {
        this.disease = disease;
    }
}
