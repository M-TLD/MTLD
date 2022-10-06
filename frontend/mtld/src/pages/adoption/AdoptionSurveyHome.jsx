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
    margin-top: 7vw;
    height: 57vh;
    border-radius: 10px;
    background-color: #ffdcdc;
    position: relative;

    .commentKr {
      position: absolute;
      top: 23vh;
      left: 10%;
      font-size: 14px;
      color: #5C5C5C;
     }

     .commentEng {
      position: absolute;
      top: 26vh;
      left: 40%;
      font-size: 14px;
      color: #5C5C5C;
     }

    .textArea {
      position: absolute;
      top: 14vh;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      line-height: 0.5rem;
      font-size: 1.5rem;
      font-family: 'UhBeemunseulye';
      line-height: 0.5em;
      text-align: center;
      color: #5C5C5C;
    }
    
  }
  `;

const DogImage = styled.img`
  position: absolute;
  height: 45vh;
  top: 27vh;
  left: 10%;
`;

const GoBackButton = styled.button`
  margin-top: 14vh;
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #FFDCDC;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  font-family: GmarketSansMedium;
  color: #5c5c5c;
  border-radius: 10px;
  font-size: 110%;
  margin-bottom: 3vh;
`;

function AdoptionSurveyHome() {
  return (
    <Wrap>
      <div className="container">
        <div className="textArea">
          <p>나는 유기견이에요</p>
          <p>가족과 헤어지고 말았어요</p>
          <p>저의 새로운 가족이</p>
          <p>되어주실래요?</p>
        </div>
        <p className="commentKr"># 사지말고 입양하세요</p>
        <p className="commentEng"># Don&rsquo;t buy Adopt me</p>
      </div>
      <DogImage src={sadBeagle} />
      <Link to="/adoption-survey">
        <GoBackButton>입양 가능 적합도 검사</GoBackButton>
      </Link>
    </Wrap>
  );
}

export default AdoptionSurveyHome;
