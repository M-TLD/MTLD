package com.mtld.backend.controller;

import com.mtld.backend.dto.vaccine.VaccinationRequestDto;
import com.mtld.backend.dto.vaccine.VaccinationResponseDto;
import com.mtld.backend.dto.vaccine.VaccinationUpdateRequestDto;
import com.mtld.backend.service.user.UserService;
import com.mtld.backend.service.vaccine.VaccinationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * created by myeongseok on 2022/09/25
 */

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/vaccine")
public class VaccinationController {

    private final UserService userService;

    private final VaccinationService vaccinationService;

    @GetMapping("/{dogId}")
    public ResponseEntity<?> findByDogID(@PathVariable("dogId") Long dogId) {
        log.info("getDogId = {}", dogId);

        Long userId = userService.getMyInfoSecret().getId();
        List<VaccinationResponseDto> vaccinationResponseDtoList = vaccinationService.getVaccinationByDog(userId, dogId);
        return ResponseEntity.status(HttpStatus.OK).body(vaccinationResponseDtoList);
    }

    @PostMapping
    public ResponseEntity<?> registerTakingMed(@RequestBody @Valid VaccinationRequestDto vaccinationRequestDto) {
        log.info("vaccinationRequestDto :{}", vaccinationRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.registerVaccination(userId, vaccinationRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PatchMapping
    public ResponseEntity<?> updateMedicine(@RequestBody @Valid VaccinationUpdateRequestDto vaccinationUpdateRequestDto) {
        log.info("vaccinationUpdateRequestDto : {}", vaccinationUpdateRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.updateVaccination(userId, vaccinationUpdateRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{medicineId}")
    public ResponseEntity<?> deleteMedicine(@PathVariable("vaccinationId") Long vaccinationId) {
        log.info("vaccinationId : {}", vaccinationId);
        Long userId = userService.getMyInfoSecret().getId();
        vaccinationService.deleteVaccination(userId, vaccinationId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
