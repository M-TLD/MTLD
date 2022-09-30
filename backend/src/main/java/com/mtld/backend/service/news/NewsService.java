package com.mtld.backend.service.news;

import com.mtld.backend.entity.news.News;

import java.util.List;

/**
 * created by seongmin on 2022/09/29
 */
public interface NewsService {
    List<News> saveNews() throws Exception;
    List<News> getNews() throws Exception;
}
