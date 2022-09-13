package com.mtld.backend.repository;

import com.mtld.backend.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * created by seongmin on 2022/09/13
 */
public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
}
