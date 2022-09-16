import React, { useState } from 'react';
import styled from 'styled-components';
// import CalenderView from 'components/common/CalendarView';

const StyledWalkResult = styled.div`
  .div {
    display: flex;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    flex-direction: column;
    box-shadow: 4px 4px #e6e4e4;
    padding-top: 1vh;
    padding-bottom: 1vh;
    color: #5c5c5c;
    width: 350px; // 캘린더 기본 너비와 일치시킴
  }

  .title {
    text-align: left;
  }

  .hr {
    width: 350px;
    background-color: #a4a4a4;
    height: 1px;
  }

  .text {
    font-size: 0.9rem;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }

  .result {
    margin-top: 1vh;
    margin-bottom: 1vh;
  }

  .item {
    font-size: 0.8rem;
    background-color: #eafed1;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    margin-right: 3vh;
    margin-left: 3vh;
  }

  .value {
    font-size: 0.8rem;
    float: left;
    margin-right: 3vh;
  }
`;

function WalkLogResult(props) {
  // console.log(props.value);
  const selectedYear = props.value.getFullYear();
  const selectedMonth = props.value.getMonth() + 1;
  const selectedDate = props.value.getDate();

  const date = `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일`;

  const [time, setTime] = useState(2.5);
  const [distance, SetDistance] = useState(5);

  const printTime = `${time} 시간`;
  const printDistance = `${distance} km`;

  return (
    <StyledWalkResult>
      <div className="div">
        <div className="title">산책일지</div>
        <hr className="hr" />
        <p className="text">{date}</p>
        <div className="result">
          <div className="item">시간</div>
          <div className="value">{printTime}</div>
          <div className="item">거리</div>
          <div className="value">{printDistance}</div>
        </div>
      </div>
    </StyledWalkResult>
  );
}

export default WalkLogResult;
