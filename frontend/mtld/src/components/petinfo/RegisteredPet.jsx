import React, { useState } from 'react';
import styled from 'styled-components';
import bobi from 'assets/bobi.png';

const Wrap = styled.div`
  margin: 0;
  padding: 0;
`;

const PuppyInfo = styled.div`
  display: flex;
  margin: 2vh;
  height: 20vh;

  .puppyInfo {
    padding-left: 5vw;
  }

  h2 {
    color: #5c5c5c;
    text-align: left;
    margin: 0;
    padding-bottom: 2vh;
  }

  p {
    color: #5c5c5c;
    text-align: left;
    margin: 0;
  }

  .buttonDiv {
    display: flex;
    width: 100%;
    margin-top: 1vh;
  }

  button {
    width: 100%;
    border-radius: 5px;
    height: 1.5rem;
    margin-right: 1vw;
    border: none;
    background-color: #ffeeb1;
  }
`;

const PuppyImage = styled.img`
  height: 20vh;
  width: 20vh;
  border: 3px solid #ffeeb1;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
`;

function RegisteredPet() {
  return (
    <Wrap>
      <PuppyInfo>
        <div className="puppyImage">
          <PuppyImage src={bobi} alt="" />
        </div>
        <div className="puppyInfo">
          <h2>보비 ♀</h2>
          <p>래브라도 리트리버</p>
          <p>2020년 9월 25일 생</p>
          <div className="buttonDiv">
            <button type="button">세부정보</button>
            <button type="button" style={{ color: '#F38181' }}>
              삭제하기
            </button>
          </div>
        </div>
      </PuppyInfo>
    </Wrap>
  );
}

export default RegisteredPet;
