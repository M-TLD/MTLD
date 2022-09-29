package com.mtld.backend.service.news;

import com.mtld.backend.entity.news.News;
import com.mtld.backend.repository.news.NewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * created by seongmin on 2022/09/29
 */

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final String MEDIA = "반려동물뉴스";

    @Transactional
    @Override
    public List<News> saveNews() throws Exception {

        Document doc = Jsoup.connect("http://www.cabn.kr/news/search_result.html?search=반려견").get();

        Elements listElement = doc.select("ul.art_list_all > li");
        List<News> list = new ArrayList<>();
        for (org.jsoup.nodes.Element element : listElement) {
            String link = "http://www.cabn.kr/news/" + element.select("a").attr("href");
            String title = element.select("a > h2").text();
            String summary = element.select("a > p").text();
            String writer = element.select("a > ul > li.name").text();
            String date = element.select("a > ul > li.date").text();

            Document detailDoc = Jsoup.connect(link).get();
            Elements detail = detailDoc.select("div.smartOutput");

            String main = detail.text();
            String image = "http://www.cabn.kr" + detail.select("img").attr("src");

            list.add(new News(title, link, summary, writer, date, image, MEDIA, main));
        }
        return newsRepository.saveAll(list);
    }

    @Override
    public List<News> getNews() throws Exception {
        List<News> news = newsRepository.findAll();
        if (news.size() == 0) {
            return saveNews();
        }
        return news;
    }
}
