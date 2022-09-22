import React from 'react';
import styled from 'styled-components';
import sadBeagle from 'assets/sad-beagle.png';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0;

 .container {
  margin: 5vw;
  height: 62vh;
  border-radius: 10px;
  background-color: #FFDCDC;

  .textArea {
    position: absolute;
    top: 15vh;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    line-height: 0.5rem;
    font-size: 1.5rem;
    font-family: 'UhBeemunseulye';
    line-height: 0.5em;
    text-align: center;
  }
 }
`;

const DogImage = styled.img`
  position: absolute;
  top: 22vh;
  left: 0;
`;

const GoBackButton = styled.button`
margin-top: 10vh;
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #ffeeb1;
  box-shadow: 0px 2px 5px 0.1px #5c5c5c;
  font-family: GmarketSansMedium;\
  color: #5c5c5c;
  border-radius: 10px;
  font-size: 110%;  
  margin-bottom: 3vh;
`;

function AdoptionSurvey() {
  return (
    <Wrap>
      <div className="container">
        <div className="textArea">
          <p>나는 유기견이에요</p>
          <p>가족과 헤어지고 말았어요</p>
          <p>저의 새로운 가족이</p>
          <p>되어주실래요?</p>
        </div>
      </div>
      <DogImage src={sadBeagle} />
      <GoBackButton>입양 가능 적합도 검사</GoBackButton>
    </Wrap>
  );
}

export default AdoptionSurvey;
