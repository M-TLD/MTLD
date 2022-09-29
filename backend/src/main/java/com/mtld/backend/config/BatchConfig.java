package com.mtld.backend.config;

import com.mtld.backend.repository.news.NewsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * created by seongmin on 2022/09/29
 */

@Configuration
@EnableBatchProcessing
@Slf4j
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private NewsRepository newsRepository;

    @Bean
    public Job job() {
        Job job = jobBuilderFactory.get("job")
                .start(step())
                .build();
        return job;
    }


    @Bean
    public Step step() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                            log.info("Step");
                            newsRepository.deleteAll();
                            return RepeatStatus.FINISHED;
                        }
                ).build();
    }
}
