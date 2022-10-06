package com.mtld.backend.entity.news;

import com.mtld.backend.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * created by seongmin on 2022/09/29
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class News extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String link;

    @Column(length = 50000)
    private String summary;

    private String writer;

    private String date;

    private String image;

    private String media;

    @Column(length = 50000)
    private String mainText;

    public News(String title, String link, String summary, String writer, String date, String image, String media, String mainText) {
        this.title = title;
        this.link = link;
        this.summary = summary;
        this.writer = writer;
        this.date = date;
        this.image = image;
        this.media = media;
        this.mainText = mainText;
    }
}
