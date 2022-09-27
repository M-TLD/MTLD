import React from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import cardlogo from 'assets/cardlogo.png';
import dog from 'assets/404dog.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sumScore } from 'app/score';

const AdoptionQuestion = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  const [num, setNum] = React.useState(0);

  const onSwipe = (direction) => {
    console.log(`You swiped: ${direction}`);
    const tempDirection = direction;
    if (tempDirection === 'left') {
      dispatch(sumScore());
    }
    setNum(num + 1);
  };

  if (num > 9) {
    return (
      <QuizResult>
        <h1>적합도 검사 결과 확인</h1>
        <img src={dog} alt="404dog" />
        <Link to="/adoption-result">
          <button className="toResult" type="button">
            적합도 검사 결과 보러가기
          </button>
        </Link>
      </QuizResult>
    );
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
              <TinderCard onCardLeftScreen={onSwipe} onCardRightScreen={onSwipe} preventSwipe={['up', 'down']}>
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

const QuizResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30vh;
  color: #5c5c5c;

  h1 {
    position: absolute;
    top: 9vh;
  }

  img {
    width: 25vw;
    margin-bottom: 5vh;
  }
  .toResult {
    width: 70vw;
    height: 5vh;
    border: none;
    background-color: #ffdcdc;
    box-shadow: 0px 2px 5px 0.1px #5c5c5c;
    font-family: GmarketSansMedium;
    color: #5c5c5c;
    border-radius: 10px;
    font-size: 110%;
    margin-bottom: 3vh;
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
