package com.mtld.backend.repository;

import com.mtld.backend.entity.UploadFile;
import com.mtld.backend.entity.diary.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * created by seongmin on 2022/09/13
 * updated by seongmin on 2022/09/21
 */
public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
//    @Modifying(clearAutomatically = true, flushAutomatically = true)
//    @Query("delete from UploadFile u where u.record = :record")
//    void deleteAllByRecordId(@Param("record") Record record);
}
