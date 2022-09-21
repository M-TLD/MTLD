import React from 'react';
import styled from 'styled-components';
import bobi from 'assets/bobi.png';
import o from 'assets/o.png';
import x from 'assets/x.png';
import paws from 'assets/paws.png';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
margin: 0;
padding: 0;

.title {
  color: #5c5c5c;
  text-align: right;
  margin-right: 3vw;
  margin-bottom: 0;
}

h1 {
  margin-bottom: -5vh;
}

.puppyProfile {
  position: relative;
  display: flex;
  padding-left: 3vw;
  align-items: center;
}

.puppyInfo {
  position: absolute;
  background-color: #ffeeb1;
  border-radius: 5px;
  width: 74%;
  margin-left: 10vh;
  height: 10vh;
  z-index: -1;
}

h2 {
  margin-left: 25vw;
}

.infoEdit {
  color: #5c5c5c;
  font-size: 90%;
  margin-top: 15vh;
  margin-left: 34vw;
}
`;

const PuppyImage = styled.img`
  height: 20vh;
  width: 20vh;
  border: 5px solid #ffeeb1;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;

const PuppyTitle = styled.div`
color: #5c5c5c;

.puppyName {
  display: flex;
  align-items: center;

.paws {
  height: 4vh;
  margin-left: 2vw;
  padding: 0;
}

}`;
const PuppyInfo = styled.div`
padding: 3vw;
color: #5c5c5c;

.subdiv {
  padding-bottom: 2vh;
}

p {
  margin: 1.5vh 2vw ;
  text-align: left;
  font-size: 130%;
}
.subtitle {
  color: #5c5c5c;
  font-weight: 900;
  border: none;
  background-color: #F1F1F1;
  border-radius: 4px;
  width: 30vw;
  height: 1.5 rem;
}

.record {
  align-items: center;
}
`;

const RegisterButton = styled.button`
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

function PetInfoDetail() {
  return (
    <Wrap>
      <PuppyTitle>
        <div className="title">
          <h1>반려견 정보</h1>
        </div>
        <div className="puppyProfile">
          <div className="PuppyImage">
            <PuppyImage src={bobi} />
          </div>
          <div className="puppyInfo">
            <div className="puppyName">
              <h2>보비(♀ ,13세)</h2>
              <img className="paws" src={paws} alt="paws" />
            </div>
          </div>
          <Link className="infoEdit" to="/pet-info-edit">정보수정</Link>
        </div>
      </PuppyTitle>
      <PuppyInfo>
        <div className="subdiv">
          <div className="subtitle">태어난 날은 ?</div>
          <p>2008년 12월 4일</p>
        </div>
        <div className="subdiv">
          <div className="subtitle">우리 아이는 ?</div>
          <p>시고르자브종</p>
        </div>
        <div className="subdiv">
          <div className="subtitle">몸무게는 ?</div>
          <p>9kg</p>
        </div>
        <div className="subdiv">
          <div className="subtitle">건강상태는 ?</div>
          <div className="record">
            <p className="neutered">중성화 여부</p>
            <img style={{ height: '5vh' }} src={o} alt="o" />
            <img style={{ height: '5vh' }} src={x} alt="x" />
            <p className="disease">질병 경력</p>
            <ul>
              <li>슬개골탈구</li>
              <li>백내장</li>
            </ul>
          </div>
        </div>
      </PuppyInfo>
      <Link to="/pet-medical-card">
        <RegisterButton>강아지 수첩 바로가기</RegisterButton>
      </Link>
    </Wrap>
  );
}

export default PetInfoDetail;
