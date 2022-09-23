package com.mtld.backend.controller;

import com.mtld.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.status(OK).body(userService.getUserById(userService.getMyInfoSecret().getId()));
    }
}
