import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AbandonedItem from 'components/adoption/AbandonedItem';
import TopImage from 'assets/dogwithperson.png';

const StyledAdoptionHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .titletext {
    margin: 1vh;
    // position: absolute;
    // top: 25%;
    // left: 50%;
    // transform: translate(-50%);
  }

  .line {
    // margin: 0;
    // padding-bottom: 5vh;
  }

  .topimage {
    width: 100%;
    height: 20%;
    opacity: 0.5;
  }

  .image {
  }

  #family {
    font-weight: bold;
  }
`;

const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1vh;
  @media screen and (min-width: 1356px) {
    flex-wrap: nowrap;
    gap: 30px;
  }
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
      <div className="image">
        <img className="topimage" src={TopImage} alt="banner" />
      </div>

      <div className="titletext">
        <span className="line">소중한 아이들의 </span>
        <span className="line" id="family">
          가족
        </span>
        <span>이 되어주세요!</span>
      </div>

      <StyledItems>
        {abandonedList.map((abandoned) => (
          <AbandonedItem key={abandoned.id} item={abandoned} />
        ))}
      </StyledItems>
    </StyledAdoptionHome>
  );
}

export default AdoptionHome;
