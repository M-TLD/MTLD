import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import BloodDonation from 'assets/blood_donation.png';
import AbandonedDog from 'assets/abandoned_pets_2.png';
import DogNose from 'assets/dog_nose.png';
import axiosInstance from 'components/auth/axiosConfig';

const StyledSwiper = styled(Swiper)`
  height: 50vh;
  background-color: #EAFED1;
  .swiper-pagination-bullet-active {
    background-color: #ffeeb1;
}
  .swiper-button-prev::after,
  .swiper-button-next::after {
    color: #ffeeb1;
    font-size: 35px;
    font-weight: 600;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  color: #5C5C5C;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Content1 = styled.img`
  height: 27vh;
  `;

const Content2 = styled.img`
  height: 26vh;
  `;

const Content3 = styled.img`
  height: 32vh;
  `;

const NewsContainer = styled.div`
  margin: 10px 10px 0 10px;
`;

const ListTitle = styled.span`
  font-size: 16px;
  font-weight: 600; 
  color: #5C5C5C;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 7px 0 7px 0;
  @media screen and (min-width: 1356px) {
    font-size: 20px;
  }
`;

const Highlight = styled.span`
  color: #81E3D7;
`;

const Item = styled.div`
  display: flex;
  justfiy-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #5c5c5c;
`;

const ImgDiv = styled.div`
  width: 140px;
  height: 100px;
  @media screen and (min-width: 1356px) {
    width: 200px;
    height: 140px;
  }
`;

const NewsImg = styled.img`
  width: 140px;
  height: 100px;
  border: 3px solid #FFEEB1;
  border-radius: 5px;
  overflow: hidden;
  object-fit: cover;
  @media screen and (min-width: 1356px) {
    width: 200px;
    height: 140px;
  }
`;

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const TitleDiv = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  @media screen and (min-width: 1356px) {
    font-size: 16px;
  }
`;

const NewsInfo = styled.span`
  font-size: 9px;
  margin-right: 5px;
  @media screen and (min-width: 1356px) {
    font-size: 13px;
  }
`;

const SummaryDiv = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 13px;
  font-size: 7px;
  @media screen and (min-width: 1356px) {
    font-size: 11px;
  }
`;

const Atag = styled.a`
  text-decoration: underline;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
    color: #5c5c5c;
    font-size: 7px;
    font-weight: 600;
  }
  @media screen and (min-width: 1356px) {
    font-size: 11px;
  }
`;

// const accessToken = localStorage.getItem('access-token');
// useState 써서 res.data 넣어버리기
function InfoBoard() {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    axiosInstance.get('api/news')
      .then((res) => {
        console.log(res.data);
        setNewsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <StyledSwiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1} // 한 슬라이드에 보여줄 갯수
        onSlideChange={() => console.log()}
        onSwiper={() => console.log()}
        navigation
        pagination
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <StyledSwiperSlide>
          <Atag href="https://www.ekara.org/parttake/serve" target="_blank">
            <Title>유기견 보호소 봉사활동 같이 가요~!</Title>
          </Atag>
          <Content1 src={AbandonedDog} />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Atag href="https://pet-edu.tistory.com/116" target="_blank">
            <Title>강아지 코는 왜 촉촉할까요? 🤔</Title>
          </Atag>
          <Content2 src={DogNose} />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Atag href="https://www.youtube.com/watch?v=CtuVjYXdbQA" target="_blank">
            <Title>강아지 헌혈에 대해 알아봐요 🧐</Title>
          </Atag>
          <Content3 src={BloodDonation} />
        </StyledSwiperSlide>
      </StyledSwiper>
      <NewsContainer>
        <ListTitle>🐕강아지 관련<Highlight>&nbsp;소식</Highlight> &nbsp;알아보기</ListTitle>
        {newsList.map((news, i) => (
          <div key={i}>
            <Item>
              <ImgDiv>
                <NewsImg src={news.image} alt="news" />
              </ImgDiv>
              <NewsContent>
                <TitleDiv>
                  <span>{news.title}</span>
                </TitleDiv>
                <div>
                  <NewsInfo>{news.writer}</NewsInfo>
                  <NewsInfo>{news.date}</NewsInfo>
                </div>
                <SummaryDiv>
                  <span>{news.mainText}</span>
                </SummaryDiv>
                <Atag href={news.link} target="_blank" rel="noreferrer">
                  더보기
                </Atag>
              </NewsContent>
            </Item>
          </div>
        ))}
      </NewsContainer>
    </div>
  );
}

export default InfoBoard;
