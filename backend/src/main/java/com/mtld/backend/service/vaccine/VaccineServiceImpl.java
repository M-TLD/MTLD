package com.mtld.backend.service.vaccine;

import com.mtld.backend.dto.vaccine.VaccineDto;
import com.mtld.backend.entity.vaccine.Vaccine;
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
public class VaccineServiceImpl implements VaccineService {
    private final VaccineRepositpry vaccineRepositpry;

    @Override
    public List<VaccineDto> getAllVaccine() {

        List<VaccineDto> vaccineDtoList = new ArrayList<>();
        for (Vaccine vaccine : vaccineRepositpry.findAll()) {
            vaccineDtoList.add(VaccineDto.of(vaccine));
        }
        return vaccineDtoList;
    }
}
