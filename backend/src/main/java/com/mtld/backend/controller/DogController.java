package com.mtld.backend.controller;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.service.dog.DogService;
import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * created by myeongseok on 2022/09/14
 * updated by myeongseok on 2022/09/19
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/dogs")
public class DogController {
    private final DogService dogService;

    private final UserService userService;

    @GetMapping("/{id}") // 해당하는 id의 Dog로 반환
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        log.info("id = {}", id);
        DogResponseDetailDto dogResponseDetailDto = dogService.getDogById(userService.getMyInfoSecret().getId(), id);
        return ResponseEntity.status(HttpStatus.OK).body(dogResponseDetailDto);

    }

    @PostMapping
    public ResponseEntity<?> registerDog(@RequestBody @Valid DogRequestDto dogRequestDto) {
        log.info("dogRequestDto : " + dogRequestDto);
        Long userId = userService.getMyInfoSecret().getId();
        dogService.registerDog(userId, dogRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

}
