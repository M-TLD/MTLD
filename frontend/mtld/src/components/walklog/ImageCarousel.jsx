import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/pagination';

import Photo from 'assets/dogwithperson.png';
import Paw from 'assets/paw.png';
import PawYellow from 'assets/paw_yellow.png';
import PawBlue from 'assets/paw_blue.png';

const StyledCarousel = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 330px;

  // .swiper-slide {
  //   /* Center slide text vertically */
  //   display: -webkit-box;
  //   display: -ms-flexbox;
  //   display: -webkit-flex;
  //   display: flex;
  //   -webkit-box-pack: center;
  //   -ms-flex-pack: center;
  //   -webkit-justify-content: center;
  //   justify-content: center;
  //   -webkit-box-align: center;
  //   -ms-flex-align: center;
  //   -webkit-align-items: center;
  //   align-items: center;
  // }

  .swiper-slide img {
    border: 2px solid #
    display: block;
    width: 300px;
    height: 300px;
    object-fit: cover;
    overflow: hidden;
  }

  .swiper-wrapper {
    height: 1000px;
    position: relative;
    display: flex;
  }

  .swiper-pagination {
    position: absolute;
    top: 305px;
    // background-color: black;
  }

  .swiper-pagination-bullet {
    // display: block;
    // position: absolute !important;
    // top: 50px !important;
  }

  .swiper-pagination-bullet-active {
    background-color: #ffeeb1;
  }
`;

function ImageCarousel(props) {
  const ImageList = [Paw, PawYellow, PawBlue];
  return (
    <StyledCarousel>
      <Swiper pagination modules={[Pagination]} className="mySwiper">
        {ImageList.map((image) => (
          <SwiperSlide>
            <img src={image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledCarousel>
  );
}

export default ImageCarousel;
