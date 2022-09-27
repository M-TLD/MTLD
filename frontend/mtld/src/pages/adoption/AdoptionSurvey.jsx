import { useState } from 'react';
import Score from 'components/adoption/DisqualifiedTestResult';
import Quiz from 'components/adoption/AdoptionQuestion';
import styled from 'styled-components';
import cardlogo from 'assets/cardlogo.png';

const QuizDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30vh;
  text-align: center;
`;

const StartButton = styled.button`
  text-align: center;
  border: none;
  font-weight: 800;
  border-radius: 30px;
  width: 60vw;
  background: #ffdcdc;
  color: #fff;
  font-family: GmarketSansMedium;
  box-shadow: 0px 3px 5px 0.1px #888888;
`;

const AdoptionSurvey = () => {
  const [states, setStates] = useState({
    mode: 'main',
    name: 'USER',
    score: '44',
    quizList: [
      { question: '함께 사는 가족 구성원 모두가 반려동물 입양에 동의하나요?', answer: 'O' },
      { question: '삶에 큰 변화가 생겨도 끝까지 책임질 수 있나요?', answer: 'O' },
      { question: '입양 할 반려동물의 습성에 대해 공부하셨나요?', answer: 'O' },
      { question: '기존에 있던 반려동물이 집에서 다른 동물과 잘 어울리나요?', answer: 'O' },
      { question: '경제적으로 지원이 가능한가요? (사료, 물품, 병원비 등)', answer: 'O' },
      { question: '매일 반려동물을 위해 시간을 할애할 수 있나요?', answer: 'O' },
      { question: '반려동물이 살기 적합한 환경에 거주하고 계신가요?', answer: 'O' },
      { question: '자녀가 있다면, 책임감을 갖고 함께 돌볼 수 있나요?', answer: 'O' },
      { question: '장시간 집을 비울 경우 맡길 곳이 있나요?', answer: 'O' },
      { question: '반려동물과 10년 이상 함께 할 준비가 되셨나요?', answer: 'O' },
    ],
  });

  function changeMode(mode) {
    setStates({ ...states, mode });
  }

  return (
    <div>
      {states.mode === 'main' ? (
        <QuizDiv>
          <img src={cardlogo} alt="puppy" style={{ width: '20vw', margin: '2vh' }} />
          <StartButton
            style={{ border: '0', borderRadius: '15px', fontSize: '2rem' }}
            onClick={() => {
              changeMode('quiz');
            }}
          >
            퀴즈 시작하기
          </StartButton>
        </QuizDiv>
      ) : null}
      {states.mode === 'score' ? <Score name={states.name} score={states.score} /> : null}
      {states.mode === 'quiz' ? (
        <Quiz
          mode={() => {
            changeMode('score');
          }}
          quizList={states.quizList}
        />
      ) : null}
    </div>
  );
};

export default AdoptionSurvey;
