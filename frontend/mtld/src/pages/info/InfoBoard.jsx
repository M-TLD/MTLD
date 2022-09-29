import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BloodDonation from 'assets/blood_donation.png';
import AbandonedDog from 'assets/abandoned_pets_2.png';
import DogNose from 'assets/dog_nose.png';

const StyledSwiper = styled(Swiper)`
  height: 50vh;
  background-color: #EAFED1;
  .swiper-button-prev {
    color: #ffeeb1;
    font-size: 50px !important;
  }
  .swiper-button-next {
    color: #ffeeb1;
  }
  .swiper-pagination-bullet-active {
    background-color: #ffeeb1;
}
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  color: #5C5C5C;
  font-size: 18px;
  font-weight: 600;
`;
const Content1 = styled.img`
  height: 32vh;`;
const Content2 = styled.img`
  height: 28vh;`;
const Content3 = styled.img`
  height: 26vh;
`;

function InfoBoard() {
  return (
    <div>
      <StyledSwiper
        modules={[Navigation, Pagination]}
        slidesPerView={1} // 한 슬라이드에 보여줄 갯수
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
        pagination
      >
        <StyledSwiperSlide>
          <Title>강아지 헌혈에 대해 알아봐요</Title>
          <Content1 src={BloodDonation} />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Title>유기견 보호소 봉사활동을 가요~!</Title>
          <Content2 src={AbandonedDog} />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Title>강아지 코는 왜 촉촉할까요? 🤔</Title>
          <Content3 src={DogNose} />
        </StyledSwiperSlide>
      </StyledSwiper>
    </div>
  );
}

export default InfoBoard;
