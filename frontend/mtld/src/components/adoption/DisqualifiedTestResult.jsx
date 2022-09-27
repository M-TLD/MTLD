import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import sadPuppy from 'assets/sad_puppy.png';
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
    font-size: 150%;
    font-family: 'Uhbeemunseulye';
  }

  .guideline p {
    margin: 1vh;
  }

  button {
    width: 230px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ffdcdc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    font-family: 'GmarketSansMedium';
    color: #5c5c5c;
    margin-top: 3vh;
  }
`;

function DisqualifiedTestResult() {
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  function reset() {
    dispatch(resetScore());
  }

  return (
    <Wrap>
      <h1>나의 입양 가능 적합도</h1>
      <img src={sadPuppy} alt="crying-puppy" />
      <div className="myScore">
        {score}
        <span>점</span>
      </div>
      <div className="guideline">
        <p>시간을 충분히 더 가지고</p>
        <p>우리를 맞을 준비를 해주개</p>
        <p>입양은 신중히</p>
        <p>책임은 끝까지 !</p>
      </div>
      <Link to="/adoption-survey">
        <button type="button" onClick={reset}>
          적합도 다시 알아보기
        </button>
      </Link>
    </Wrap>
  );
}

export default DisqualifiedTestResult;
