package com.mtld.backend.service.vaccine;

import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.entity.vaccine.Vaccination;

import java.util.List;

/**
 * created by myeongseok on 2022/09/24
 */
public interface VaccinationService {
    public VaccinationResponseDto getVaccinationResponseDtoById(Long vaccinationId);

    public List<VaccinationResponseDto> getVaccinationByDog(Long userId, Long dogId);

    public void registerVaccination(Long userId, VaccinationRequestDto vaccinationRequestDto);

    public void updateVaccination(Long userId, VaccinationUpdateRequestDto vaccinationUpdateRequestDto);

    public void deleteVaccination(Long userId, Long takingMedicineId);
}
