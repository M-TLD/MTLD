import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledItem = styled.div`
  color: #5c5c5c;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .img {
    border: 6px solid #ffeeb1;
    width: 280px;
    height: 280px;
    margin-top: 1vh;
  }

  .div {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .paragraph {
    display: flex;
    align-items: center;
    margin-top: 0.8vh;
    margin-bottom: 0;
  }

  .title {
    display: inline-block;
    width: 80px;
    background-color: #ffeeb1;
    border-radius: 3px;
    padding: 2px;
    margin-right: 3vh;
    vertical-align: middle;
  }

  .text {
    padding-bottom: 3px;
  }
`;

const Button = styled.div`
  width: 280px;
  height: 4vh;
  background-color: #ffdcdc;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;

  .content {
    font-size: 14px;
  }
`;

function AbandonedDetail() {
  const url = window.location.href;
  const id = url.split('/')[4];

  const [puppy, setPuppy] = useState([]);

  useEffect(() => {
    axios
      .get(`https://mtld-2d290-default-rtdb.firebaseio.com/abandoned/${id}.json`)
      .then((res) => res.data)
      .then((data) => {
        setPuppy(data);
      });
  }, []);
  // console.log(puppy);

  return (
    <StyledItem>
      <img className="img" src={puppy.img} alt="puppy" width="300px" height="300px" style={{ overflow: 'hidden' }} />
      <div className="div">
        <p className="paragraph">
          <span className="title">공고번호</span>
          <span className="text">{puppy.num}</span>
        </p>
        <p className="paragraph">
          <span className="title">유기날짜</span>
          <span className="text">{puppy.date}</span>
        </p>
        <p className="paragraph">
          <span className="title">유기장소</span>
          <span className="text">{puppy.location}</span>
        </p>
        <p className="paragraph">
          <span className="title">동물보호소</span>
          <span className="text">{puppy.center}</span>
        </p>
        <p className="paragraph">
          <span className="title">견종</span>
          <span className="text">{puppy.breed}</span>
        </p>
        <p className="paragraph">
          <span className="title">성별</span>
          <span className="text">{puppy.sex}</span>
        </p>
        <p className="paragraph">
          <span className="title">나이</span>
          <span className="text">{puppy.age}</span>
          <span className="text">년생</span>
        </p>
        <p className="paragraph">
          <span className="title">몸무게</span>
          <span className="text">{puppy.weight}</span>
        </p>
        <p className="paragraph">
          <span className="title">중성화여부</span>
          <span className="text">{puppy.neutered}</span>
        </p>
        <p className="paragraph">
          <span className="title">특징</span>
          <span className="text">{puppy.feature}</span>
        </p>
      </div>
      <Button onClick={() => window.open('https://www.animal.go.kr/front/awtis/protection/protectionList.do?menuNo=1000000060', '_blank')}>
        <span className="content">평생가족 되어주기</span>
      </Button>
    </StyledItem>
  );
}

export default AbandonedDetail;
