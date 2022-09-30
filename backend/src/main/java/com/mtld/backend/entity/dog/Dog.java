package com.mtld.backend.entity.dog;

import com.mtld.backend.converter.BooleanToYNConverter;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.entity.*;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.entity.user.User;
import com.mtld.backend.entity.vaccine.Vaccination;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/08
 * updated by myeongseok on 2022/09/20
 */

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Dog extends BaseEntity {
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

    private String disease;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @OneToMany(mappedBy = "dog")
    private List<TakingMedicine> takingMedicines = new ArrayList<>();

    @OneToMany(mappedBy = "dog")
    private List<Vaccination> vaccinations = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fileURL;

    @Builder
    public Dog(String name, LocalDate birthdate, Gender gender, Double weight, boolean neuter, Breed breed, User user) {
        this.name = name;
        this.birthdate = birthdate;
        this.gender = gender;
        this.weight = weight;
        this.neuter = neuter;
        this.breed = breed;
        this.user = user;
    }

    public void withdrawNeuter() {
        this.neuter = true;
    }

    public void writeDisease(String disease) {
        this.disease = disease;
    }

    public void uploadFile(String fileURL) {
        this.fileURL = fileURL;
    }

    public void update(DogUpdateRequestDto dogUpdateRequestDto) {
        this.weight = dogUpdateRequestDto.getWeight();
        if (!this.neuter && dogUpdateRequestDto.isNeuter()) withdrawNeuter();
        writeDisease(dogUpdateRequestDto.getDisease());
        if (!this.fileURL.equals(dogUpdateRequestDto.getFileURL()))
            uploadFile(dogUpdateRequestDto.getFileURL());
    }
}

