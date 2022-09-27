package com.mtld.backend.controller;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.dto.dog.DogUpdateRequestDto;
import com.mtld.backend.service.dog.DogService;
import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

/**
 * created by myeongseok on 2022/09/14
 * updated by myeongseok on 2022/09/20
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/dogs")
public class DogController {
    private final DogService dogService;

    private final UserService userService;

    @GetMapping("/{dogId}") // 해당하는 id의 Dog로 반환
    public ResponseEntity<?> findById(@PathVariable("dogId") Long dogId) {
        log.info("getDogId = {}", dogId);
        DogResponseDetailDto dogResponseDetailDto = dogService.getDogById(userService.getMyInfoSecret().getId(), dogId);
        return ResponseEntity.status(HttpStatus.OK).body(dogResponseDetailDto);

    }

    @PostMapping
    public ResponseEntity<?> registerDog(@RequestPart(value = "dog") @Valid DogRequestDto dogRequestDto,
                                         @RequestPart(value = "image", required = false) MultipartFile multipartFile) {
        log.info("dogRequestDto = {}", dogRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        dogService.registerDog(userId, dogRequestDto, multipartFile);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PatchMapping
    public ResponseEntity<?> updateDog(@RequestBody @Valid DogUpdateRequestDto dogUpdateRequestDto) {
        log.info("dogUpdateRequestDto : {}", dogUpdateRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        dogService.updateDog(userId, dogUpdateRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{dogId}")
    public ResponseEntity<?> deleteDog(@PathVariable("dogId") Long dogId) {
        log.info("deleteDog : {}", dogId);
        Long userId = userService.getMyInfoSecret().getId();
        dogService.deleteDog(userId, dogId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
