package com.mtld.backend.controller;

import com.mtld.backend.dto.dog.DogRequestDto;
import com.mtld.backend.dto.dog.DogResponseDetailDto;
import com.mtld.backend.service.dog.DogService;
import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

/**
 * created by seongmin on 2022/09/23
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final DogService dogService;

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.status(OK).body(userService.getUserById(userService.getMyInfoSecret().getId()));
    }

    @GetMapping("/dogs")
    public ResponseEntity<?> getDogsByUser() {
        Long userId = userService.getMyInfoSecret().getId();
        log.info("userId = {}", userId);
        List<DogResponseDetailDto> dogResponseDetailDtoList = dogService.getDogByUser(userId);
        return ResponseEntity.status(OK).body(dogResponseDetailDtoList);
    }
}
