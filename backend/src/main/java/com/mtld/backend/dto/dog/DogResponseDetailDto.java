package com.mtld.backend.dto.dog;

import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

/**
 * created by myeongseok on 2022/09/19
 */
@Data
@Builder
public class DogResponseDetailDto {

    private Long id;
    private String name;
    private LocalDate birthdate;
    private Gender gender;
    private Double weight;
    private boolean neuter;
    private String disease;
    private String breedName;
    private String fileURL;

    public static DogResponseDetailDto of(Dog dog) {
        return DogResponseDetailDto.builder()
                .id(dog.getId())
                .name(dog.getName())
                .birthdate(dog.getBirthdate())
                .gender(dog.getGender())
                .weight(dog.getWeight())
                .neuter(dog.isNeuter())
                .disease(dog.getDisease())
                .breedName(dog.getBreed().getName())
                .fileURL(dog.getFileURL())
                .build();
    }
}
