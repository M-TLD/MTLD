import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { resetScore } from 'app/score';

const Wrap = styled.div`
  color: #5c5c5c;
  margin: 8vh 0;

  img {
    width: 30vw;
  }

  .myScore {
    font-size: 5rem;
    font-weight: 800;
    color: #f38181;
  }

  .guideline {
    margin-top: 5vh;
  }

  .guideline p {
    margin: 0;
  }

  button {
    width: 230px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ffdcdc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    margin-top: 5px;
    font-family: 'GmarketSansMedium';
    color: #5c5c5c;
    margin-top: 5vh;
  }
`;

function QualifiedTestResult() {
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  function reset() {
    dispatch(resetScore());
  }

  return (
    <Wrap>
      <h1>나의 입양 가능 적합도</h1>
      <div className="myScore">
        {score}
        <span>점</span>
      </div>
      <div className="guideline">
        <p>아이들의 가족이 되어주세요!</p>
        <p>당신의 입양을 기다리는 아이들</p>
      </div>
      <div className="carousel">
        <div>d</div>
        <div>d</div>
        <div>d</div>
      </div>
      <Link to="/adoption-survey">
        <button type="button" onClick={reset}>
          적합도 다시 알아보기
        </button>
      </Link>
    </Wrap>
  );
}

export default QualifiedTestResult;
