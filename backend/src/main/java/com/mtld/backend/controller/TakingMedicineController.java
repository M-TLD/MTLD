package com.mtld.backend.controller;

import com.mtld.backend.dto.medicine.TakingMedicineRequestDto;
import com.mtld.backend.dto.medicine.TakingMedicineResponseDto;
import com.mtld.backend.dto.medicine.TakingMedicineUpdateRequestDto;
import com.mtld.backend.service.dog.DogService;
import com.mtld.backend.service.medicine.TakingMedicineService;
import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * created by myeongseok on 2022/09/23
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/medicine")
public class TakingMedicineController {

    private final UserService userService;

    private final TakingMedicineService takingMedicineService;

    @GetMapping("/{dogId}")
    public ResponseEntity<?> findByDogID(@PathVariable("dogId") Long dogId) {
        log.info("getDogId = {}", dogId);

        Long userId = userService.getMyInfoSecret().getId();
        List<TakingMedicineResponseDto> takingMedicineResponseDto = takingMedicineService.getTakingMedicineByDog(userId, dogId);
        return ResponseEntity.status(HttpStatus.OK).body(takingMedicineResponseDto);

    }

    @PostMapping
    public ResponseEntity<?> registerTakingMedicine(@RequestBody @Valid TakingMedicineRequestDto takingMedicineRequestDto) {
        log.info("takingMedicineRequestDto :{}", takingMedicineRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        takingMedicineService.registerTakingMedicine(userId, takingMedicineRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PatchMapping
    public ResponseEntity<?> updateTakingMedicine(@RequestBody @Valid TakingMedicineUpdateRequestDto takingMedicineUpdateRequestDto) {
        log.info("takingMedicineUpdateRequestDto : {}", takingMedicineUpdateRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        takingMedicineService.updateTakingMedicine(userId, takingMedicineUpdateRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{medicineId}")
    public ResponseEntity<?> deleteTakingMedicine(@PathVariable("takingMedicineId") Long takingMedicineId) {
        log.info("takingMedicineId : {}", takingMedicineId);
        Long userId = userService.getMyInfoSecret().getId();
        takingMedicineService.deleteTakingMedicine(userId, takingMedicineId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
