package com.mtld.backend.entity;

import com.mtld.backend.entity.diary.Record;
import com.mtld.backend.entity.dog.Dog;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * created by seongmin on 2022/09/08
 * updated by myeongseok on 2022/09/19
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UploadFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;


    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;

    @Builder
    public UploadFile(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
