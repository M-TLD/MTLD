# 멍더랜드 README

---

![MTLD logo.png](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/MTLD_logo.png)

# 🐾 멍!더랜드

> **네가 한 단어만이라도 말할 수 있다면, 아프다고 말 할 수 있었으면 좋겠어**
> 강아지 증상 빅데이터 기반 반려견 질병 예측 서비스, 멍!더랜드

# 🐾 프로젝트 및 팀원소개

### 🐶[멍!더랜드 배포 페이지 놀러가기](https://j7a106.p.ssafy.io/)

### 🎡[멍!더랜드팀 노션 구경가기](https://www.notion.so/MTLD-509c9dc81ee8401db30b836ca65ec1b7)

### 📅 진행기간: 2022. 08. 29 ~ 2022. 10. 07 (6주)

![team.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/team.gif)

# 🐾 기획 배경 및 주요 기능 소개

## ✔️ 기획 의도

![Screen Shot 2022-10-06 at 10.40.09 PM.png](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/Screen_Shot_2022-10-06_at_10.40.09_PM.png)

반려인과 반려동물을 위한 토탈 케어 서비스

가족이라는 존재가 되어 삶의 일부가 된 반려동물, 댕댕이들!
말을 할 수 없어 어디가 아픈지 모르는 우리 댕댕이들의 질병을 미리 예방하고 건강을 관리하여 견생을 더 오래오래 **_건강하개 · 행복하개 · 소중하개_** 보냈으면 하는 바람으로 기획하게 되었습니다.

## _✔️ 건강하개: 반려견 **건강**을 위한 가이드라인_

### 1. 반려견 질병 증상 빅데이터를 이용한 **질병 예측 서비스**

- 질병 증상 빅데이터 활용
- TF-IDF 모델과 코사인 유사도를 사용한 Content Based Filtering 사용

![질병예측.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EC%25A7%2588%25EB%25B3%2591%25EC%2598%2588%25EC%25B8%25A1.gif)

### 2. 반려견 예방 접종 / 복용약 알림 서비스

- 가장 보편적인 예방 접종 백신 상위 4개 선정 (`DHPPL`, `코로나`, `켄넬코프`, `광견병`)
  - 추후 예방접종일 설정 가능 → 메인화면에서 가장 가까운 날짜까지의 디데이 표시
- 가장 보편적인 애견 복용 약 상위 3가지 선정
  - 급여 빈도 안내 (한 달에 한 번, 일 년에 한 번 등)
  - 추후 복용일자 설정 시 홈화면에서 알림 표시

![트래커.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25ED%258A%25B8%25EB%259E%2598%25EC%25BB%25A4.gif)

### 3. 현재 위치 기반 동물 병원 검색

- 버튼 클릭 시 사용자의 위치 기반으로 주변의 동물 병원 안내
- 반려견과 함께 방문 가능한 카페/식당/숙소 정보 제공
- 현재 위치 기반 가까운 순서대로 필터링 가능, 사용자가 입력한 정보를 받아 검색 가능

![장소.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EC%259E%25A5%25EC%2586%258C.gif)

## **_✔️ 행복하개: 함께 있을때 가장 행복하니까!_**

### 1. 산책 일지

- 날짜별 시간/거리 입력 가능
- 달력의 산책을 완료한 날짜에는 발자국 마크

![산책일지.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EC%2582%25B0%25EC%25B1%2585%25EC%259D%25BC%25EC%25A7%2580.gif)

![다이어리.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EB%258B%25A4%25EC%259D%25B4%25EC%2596%25B4%25EB%25A6%25AC.gif)

### 2. 반려견 동반 가능 장소 검색

- 버튼 클릭 시 사용자의 위치 기반으로 반려견과 함께 방문 가능한 카페/식당/숙소 정보 제공
- 현재 위치 기반 가까운 순서대로 필터링 가능, 사용자가 입력한 정보를 받아 검색 가능

![장소.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EC%259E%25A5%25EC%2586%258C.gif)

### 3. 반려견 관련 정보 게시판

- 반려견을 키울 때 알아두면 좋을 정보 제공, 이동 링크 제공
- 반려견 관련 최신 뉴스 제목/썸네일과 이동 링크 제공

![꿀팁.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EA%25BF%2580%25ED%258C%2581.gif)

## **_✔️ 소중하개: 사지마세요, 입양하세요!_**

### 1. 입양 가능한 유기견 검색 서비스

- 동물보호시스템 공고의 유기견 정보 실시간 조회 가능
- 견종/성별/중성화/털색/몸무게/보호장소 등 필터링하여 조회 가능
- 해당 유기견에 대한 디테일한 정보 조회, 해당 유기견의 동물보호시스템 공고 페이지로 연결

![유기견.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EC%259C%25A0%25EA%25B8%25B0%25EA%25B2%25AC.gif)

### 2. 유기견 입양 적합도 검사

- 총 10개의 문항으로 현재 사용자가 반려견을 입양하기에 적합한 상태와 적절한 조건을 갖추고 있는지 점수(0~100점)로 표시
- 일정 점수 미달성 시 아직 준비가 되지 않았음을 알리고, 일정 점수 이상 달성 시 유기견 공고 이미지 캐러셀과 멍더랜드의 유기견 정보 조회 페이지로 이동 가능 버튼 제공

![검사.gif](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/%25EA%25B2%2580%25EC%2582%25AC.gif)

# 🐾 산출물

- [와이어프레임 & 스토리보드(figma)](https://www.figma.com/file/bB6OcIAQ0FvFCdPSFEOKWE/MTLD?node-id=55%3A1306)

![Untitled](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/Untitled.png)

- [ERD](https://www.erdcloud.com/)

![Untitled](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/Untitled%201.png)

- 시스템 아키텍처

![Untitled](MTLD%20README%2072983d50a7c14330b2e98049f3e1f558/Untitled%202.png)

- 파일트리
- 컨벤션
- 발표 PPT
- [포팅 매뉴얼](exec/%ED%8F%AC%ED%8C%85%EB%A7%A4%EB%89%B4%EC%96%BC.pdf)

# 🐾 협업툴

- Git
- Gitlab
- Atlassian Jira
- Notion
- MatterMost
- Webex

# 🐾 기술 스택 및 아키텍처

### **backend**

- IntelliJ IDE
- Java 11
- Springboot 2.7.3
- Spring Data JPA
- Spring Security
- MySQL
- Redis
- oauth2
- Swagger 2.9.2
- jsoup 1.15.3
- Spring Batch
- AWS S3

### **frontend**

- Visual Studio Code IDE
- React 18.2.0
- Redux-toolkit 1.8.5
- Material UI (UI Framework)
- PWA

### data

- BeautifulSoup
- selenium
- chrome web driver

### **CI/CD**

- Docker
- AWS EC2
- Jenkins
- NGINX
- SSL
