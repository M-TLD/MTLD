package com.mtld.backend.service.vaccine;

import com.mtld.backend.dto.vaccine.VaccineDto;

import java.util.List;

/**
 * created by myeongseok on 2022/09/30
 */
public interface VaccineService {
    public List<VaccineDto> getAllVaccine ();
}
