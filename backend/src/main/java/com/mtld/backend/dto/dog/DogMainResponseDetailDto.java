package com.mtld.backend.dto.dog;

import com.mtld.backend.dto.medicine.TakingMedicineResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.entity.dog.Dog;
import com.mtld.backend.entity.dog.Gender;
import com.mtld.backend.entity.medicine.TakingMedicine;
import com.mtld.backend.entity.vaccine.Vaccination;
import com.mtld.backend.entity.vaccine.Vaccine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/19
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DogMainResponseDetailDto {

    private Long id;
    private String name;
    private LocalDate birthdate;
    private Gender gender;
    private Double weight;
    private boolean neuter;
    private String disease;
    private String breedName;
    private String fileURL;
    private List<VaccinationResponseDto> vaccinations = new ArrayList<>();
    private List<TakingMedicineResponseDto> takingMedicines = new ArrayList<>();

    public static DogMainResponseDetailDto of(Dog dog) {
        List<VaccinationResponseDto> vaccinations = new ArrayList<>();
        for (Vaccination vaccination : dog.getVaccinations())
            vaccinations.add(VaccinationResponseDto.of(vaccination));

        List<TakingMedicineResponseDto> takingMedicines = new ArrayList<>();
        for (TakingMedicine takingMedicine : dog.getTakingMedicines())
            takingMedicines.add(TakingMedicineResponseDto.of(takingMedicine));

        return DogMainResponseDetailDto.builder()
                .id(dog.getId())
                .name(dog.getName())
                .birthdate(dog.getBirthdate())
                .gender(dog.getGender())
                .weight(dog.getWeight())
                .neuter(dog.isNeuter())
                .disease(dog.getDisease())
                .breedName(dog.getBreed().getName())
                .fileURL(dog.getFileURL())
                .vaccinations(vaccinations)
                .takingMedicines(takingMedicines)
                .build();
    }
}
