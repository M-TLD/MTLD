import React from 'react';
import styled from 'styled-components';
import welcomeNote from 'assets/welcome-note.png';
import pawStamp from 'assets/paw.png';
import questionDog from 'assets/404dog.png';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  position: relative;
`;

const Note = styled.img`
  width: 90vw;
  margin-bottom: 3%;
`;

const NoteText = styled.div`
  position: absolute;
  top: 40vh;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  line-height: 0.5rem;
  font-size: 2rem;
  font-family: 'UhBeemunseulye';
  text-align: center;

  h1 {
    color: #F38181;
    font-size: 3em;
  }
`;

const NoteImage = styled.div``;

const DogImage = styled.img`
margin-top: 5vh;
margin-bottom: 2vh;
width: 25vw;
`;

const Paw = styled.img`
  position: absolute;
  top: 65%;
  left: 65%;
  width: 20%;
  transform: rotate(40deg);
`;

const GoBackButton = styled.button`
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

function NotFound() {
  return (
    <div>
      <Wrap>
        <DogImage src={questionDog} />
        <NoteImage>
          <Note src={welcomeNote} />
        </NoteImage>
        <NoteText>
          <h1>404</h1>
          <p>잘못된 주소로 왔어요</p>
          <p>돌아가시개</p>
        </NoteText>
        <Paw src={pawStamp} />
        <Link to="/">
          <GoBackButton>메인으로 돌아가기</GoBackButton>
        </Link>
      </Wrap>
    </div>
  );
}

export default NotFound;
