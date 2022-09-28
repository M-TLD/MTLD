import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styled from 'styled-components';

import Paw from 'assets/paw.png';
import PawYellow from 'assets/paw_yellow.png';
import PawBlue from 'assets/paw_blue.png';

const StyledCarousel = styled.div`
  .img {
    width: 30px;
    height: 30px;
  }
`;

function ImageCarousel() {
  const ImageList = [Paw, PawYellow, PawBlue];
  return (
    <StyledCarousel>
      <Swiper pagination modules={[Pagination]} className="mySwiper">
        {/* {ImageList.map((image) => (
          <SwiperSlide></SwiperSlide>
        ))} */}
        <SwiperSlide>
          <img className="img" src={Paw} alt="paw" />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </StyledCarousel>
  );
}

export default ImageCarousel;
