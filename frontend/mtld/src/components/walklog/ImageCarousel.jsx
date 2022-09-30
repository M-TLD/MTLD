import React, { useState, useEffect } from 'react';
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
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 260px;
  height: 300px;
  margin: 0;

  .swiper-slide {
    margin: 0;
    height: 290px;
    // /* Center slide text vertically */
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: -webkit-flex;
    // display: flex;
    // -webkit-box-pack: center;
    // -ms-flex-pack: center;
    // -webkit-justify-content: center;
    // justify-content: center;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // -webkit-align-items: center;
  }

  .swiper-slide img {
    border: 5px solid #ffd98e;
    display: block;
    width: 250px;
    height: 250px;
    // object-fit: cover;
    // overflow: hidden;
  }

  .swiper-wrapper {
    position: relative;
    display: flex;
  }

  .swiper-pagination {
    position: absolute;
    top: 270px;
    height: 20px;
  }

  .swiper-pagination-bullet-active {
    background-color: #ffeeb1;
  }
`;

function ImageCarousel(props) {
  const [ImageList, setImageList] = useState([]);
  useEffect(() => {
    setImageList(props.ImageList);
  }, [props.ImageList]);
  // console.log(ImageList);

  return (
    <StyledCarousel>
      <Swiper pagination modules={[Pagination]} slidesPerView={1} className="mySwiper">
        {ImageList.map((image, id) => (
          <SwiperSlide key={id}>
            <img src={image} alt="" style={{ marginRight: 0 }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledCarousel>
  );
}

export default ImageCarousel;
