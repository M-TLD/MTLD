import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/pagination';

const StyledCarousel = styled.div`
  width: 260px;
  height: 300px;
  margin: 0;

  .swiper-slide {
    margin: 0;
    height: 290px;
  }

  .swiper-slide img {
    border: 5px solid #ffd98e;
    display: block;
    width: 250px;
    height: 250px;
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
