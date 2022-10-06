package com.mtld.backend.repository.news;

import com.mtld.backend.entity.news.News;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by seongmin on 2022/09/29
 */
public interface NewsRepository extends JpaRepository<News, Long> {
}
