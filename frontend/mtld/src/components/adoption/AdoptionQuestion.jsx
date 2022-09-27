import React from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import cardlogo from 'assets/cardlogo.png';

const AdoptionQuestion = (props) => {
  console.log(props);

  const [num, setNum] = React.useState(0);

  const onSwipe = (direction) => {
    console.log(`You swiped: ${direction}`);
    setNum(num + 1);
  };

  if (num > 9) {
    return <div>끝!</div>;
  }

  return (
    <QuizContainer>
      <p>
        <span>{num + 1}</span>
      </p>
      {props.quizList.map((l, idx) => {
        if (num === idx) {
          // props의 list에 있는 question의 값들을 순서대로 불러온다.
          return <Question key={idx}>{l.question}</Question>;
        }
        return null;
      })}

      <AnswerZone>
        <Answer>
          <span className="O">{'O '}</span>
        </Answer>
        <Answer>
          <span className="X">{' X'}</span>
        </Answer>
      </AnswerZone>

      {props.quizList.map((l, idx) => {
        if (idx === num) {
          return (
            <DragItem key={idx}>
              <TinderCard onSwipe={onSwipe} onCardLeftScreen={onSwipe} onCardRightScreen={onSwipe} preventSwipe={['up', 'down']}>
                <img src={cardlogo} alt="puppy" style={{ width: '20vw' }} />
              </TinderCard>
            </DragItem>
          );
        }
        return null;
      })}

      <div className="helper">
        <p>강아지를 O, X 쪽으로 밀어주세요</p>
      </div>
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
  margin-top: 8vh;
  color: #5c5c5c;

  & > p > span {
    padding: 8px 16px;
    background-color: #fef5d4;
    border-radius: 30px;
  }

  .helper {
    position: absolute;
    bottom: 9vh;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const Question = styled.h1`
  margin: 5vw;
  font-size: 1.5em;
`;

const AnswerZone = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: row;
  min-height: 40vh;
  gap: 50vw;
`;

const Answer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 800;

  .X {
    color: #f38181;
  }

  .O {
    color: #81e3d7;
  }
`;

const DragItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & > div {
    width: 25vw;
    height: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 500%;
    background-color: #ffeeb1;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  }
  & img {
    // max-width: 150px;
  }
`;
export default AdoptionQuestion;
