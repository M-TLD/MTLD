import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Spinner from 'components/common/Spinner';

const Wrap = styled.div`
  .images {
    height: 17vh;
    margin: 2vh;
    background-color: #ffdcdc;
    padding: 2vw;
  }
`;

function AbandonedCarousel({ item }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const [abandonedList, setAbandonedList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?numOfRows=1000&upkind=417000&_type=json&state=protect&serviceKey=WXT8p8vqKpEWsfVbboNx3tvmBeHbzj87Zpv1VqSqNdCFz4qrvPfjNjuH3qrvfkdtSRzhZiSu0arymoQwLSp%2Bbg%3D%3D',
      )
      .then((res) => res.data)
      .then((data) => {
        // console.log(data.response.body.items.item);
        setAbandonedList(data.response.body.items.item);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrap>
      <Link to="/adoption-home">
        <Slider {...settings}>
          {abandonedList.map((item) => (
            <img className="images" src={item.popfile} alt="abandoned-dogs" key={item} />
          ))}
        </Slider>
      </Link>
    </Wrap>
  );
}

export default AbandonedCarousel;
