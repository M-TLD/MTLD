package com.mtld.backend.service.medicine;

import com.mtld.backend.dto.medicine.TakingMedicineRequestDto;
import com.mtld.backend.dto.medicine.TakingMedicineResponseDto;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;

import java.util.List;

/**
 * created by myeongseok on 2022/09/21
 */
public interface TakingMedicineService {
    public TakingMedicineResponseDto getTakingMedicineById(Long medicineId);

    public List<TakingMedicineResponseDto> getTakingMedicineByDog(Long userId, Long dogId);

    public void registerTakingMedicine(Long userId, TakingMedicineRequestDto takingMedicineRequestDto);

    public void updateTakingMedicine(Long userId, TakingMedicineUpdateRequestDto medicineUpdateRequestDto);

    public void deleteTakingMedicine(Long userId, Long takingMedicineId);
}
