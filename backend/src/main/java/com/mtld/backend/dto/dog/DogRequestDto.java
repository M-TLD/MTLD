package com.mtld.backend.dto.dog;

import com.mtld.backend.entity.dog.Breed;
import com.mtld.backend.entity.dog.Gender;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class DogRequestDto {
    private int id;

    @NotNull
    private String name;

    private LocalDateTime birthdate;

    private Gender gender;

    private Double weight;

    private boolean neuter;

    private String disease;

    private Breed breed;
    
}
