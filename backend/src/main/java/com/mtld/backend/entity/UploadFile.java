package com.mtld.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * created by seongmin on 2022/09/08
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
    public UploadFile(String name, String url, Record record) {
        this.name = name;
        this.url = url;
        this.record = record;
    }
}
