package com.mtld.backend.service.medicine;

import com.mtld.backend.dto.medicine.MedicineDto;
import com.mtld.backend.dto.vaccine.VaccineDto;
import com.mtld.backend.entity.medicine.Medicine;
import com.mtld.backend.entity.vaccine.Vaccine;
import com.mtld.backend.repository.medicine.MedicineRepository;
import com.mtld.backend.repository.vaccine.VaccineRepositpry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * created by myeongseok on 2022/09/30
 */
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MedicineServiceImpl implements MedicineService {
    private final MedicineRepository medicineRepository;

    @Override
    public List<MedicineDto> getAllVaccine() {

        List<MedicineDto> medicineDtoList = new ArrayList<>();
        for (Medicine medicine : medicineRepository.findAll()) {
            medicineDtoList.add(MedicineDto.of(medicine));
        }
        return medicineDtoList;
    }
}
