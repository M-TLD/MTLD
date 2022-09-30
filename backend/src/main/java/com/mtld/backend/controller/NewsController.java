package com.mtld.backend.controller;

import com.mtld.backend.service.news.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * created by seongmin on 2022/09/29
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<?> getNews() throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(newsService.getNews());
    }
}
