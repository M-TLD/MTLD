package com.mtld.backend.controller;

import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.dto.vaccine.VaccineDto;
import com.mtld.backend.service.user.UserService;
import com.mtld.backend.service.vaccine.VaccinationService;
import com.mtld.backend.service.vaccine.VaccineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * created by myeongseok on 2022/09/25
 * updated by myeongseok on 2022/09/30
 */

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/vaccine")
public class VaccinationController {

    private final UserService userService;

    private final VaccinationService vaccinationService;

    private final VaccineService vaccineService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllVaccine() {
        List<VaccineDto> vaccineDtoList = vaccineService.getAllVaccine();
        return ResponseEntity.status(HttpStatus.OK).body(vaccineDtoList);
    }

    @GetMapping("/{dogId}")
    public ResponseEntity<?> findByDogID(@PathVariable("dogId") Long dogId) {
        log.info("getDogId = {}", dogId);

        Long userId = userService.getMyInfoSecret().getId();
        List<VaccinationResponseDto> vaccinationResponseDtoList = vaccinationService.getVaccinationByDog(userId, dogId);
        return ResponseEntity.status(HttpStatus.OK).body(vaccinationResponseDtoList);
    }

    @PostMapping
    public ResponseEntity<?> registerVaccination(@RequestBody @Valid VaccinationRequestDto vaccinationRequestDto) {
        log.info("vaccinationRequestDto :{}", vaccinationRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.registerVaccination(userId, vaccinationRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PatchMapping
    public ResponseEntity<?> updateVaccination(@RequestBody @Valid VaccinationUpdateRequestDto vaccinationUpdateRequestDto) {
        log.info("vaccinationUpdateRequestDto : {}", vaccinationUpdateRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.updateVaccination(userId, vaccinationUpdateRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{vaccineId}")
    public ResponseEntity<?> deleteVaccination(@PathVariable("vaccinationId") Long vaccinationId) {
        log.info("vaccinationId : {}", vaccinationId);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.deleteVaccination(userId, vaccinationId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
