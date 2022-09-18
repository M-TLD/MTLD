import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AbandonedItem from 'components/adoption/AbandonedItem';
import TopImage from 'assets/dogwithperson.png';

const StyledAdoptionHome = styled.div`
  .div {
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .titletext {
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .line {
    margin: 0;
  }

  .img {
    position: relative;
    width: 450px;
    height: 230px;
  }

  .img:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    border: 5px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.15);
  }

  #family {
    font-weight: bold;
  }
`;
const BannerImage = styled.img`
  width: 450px;
  height: 230px;
  opacity: 0.5;
`;

function AdoptionHome() {
  const [abandonedList, setAbandonedList] = useState([]);
  useEffect(() => {
    axios
      .get('https://mtld-2d290-default-rtdb.firebaseio.com/abandoned.json')
      .then((res) => res.data)
      .then((data) => {
        setAbandonedList(data);
      });
  }, []);
  console.log(abandonedList);

  return (
    <StyledAdoptionHome>
      <div className="div">
        <div className="img">
          <BannerImage src={TopImage} />
        </div>

        <div className="titletext">
          <p className="line">소중한 아이들의</p>
          <span className="line" id="family">
            가족
          </span>
          <span>이 되어주세요!</span>
        </div>
        {abandonedList.map((abandoned) => (
          <AbandonedItem key={abandoned.num} item={abandoned} />
        ))}
      </div>
    </StyledAdoptionHome>
  );
}

export default AdoptionHome;
