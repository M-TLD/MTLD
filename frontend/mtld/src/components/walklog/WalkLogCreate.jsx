import React from 'react';
import styled from 'styled-components';
// import CalenderView from 'components/common/CalendarView';

const StyledWalkLog = styled.div`
  .div {
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
    height: 0.5px;
  }

  .text {
    font-size: 0.9rem;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }

  .form {
    flex-direction: row;
    margin-top: 1vh;
    margin-bottom: 1vh;
    font-size: 0.9rem;
  }

  .time {
    float: left;
    margin-right: 1.5vh;
  }

  .distance {
    float: left;
  }

  .input {
    width: 5vh;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 0.3vh;
    border-color: #a4a4a4;
  }
`;

function WalkLogCreate(props) {
  // console.log(props.value);
  const selectedYear = props.value.getFullYear();
  const selectedMonth = props.value.getMonth() + 1;
  const selectedDate = props.value.getDate();

  const date = `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일`;

  return (
    <StyledWalkLog>
      <div className="div">
        <div className="title">산책일지</div>
        <hr className="hr" />
        <p className="text">{date}</p>
        <p className="text">오늘 얼만큼 산책했나요?</p>
        <div className="form">
          <div className="time">
            <input className="input" type="int" />
            <span> 시간 </span>
          </div>
          <div className="distance">
            <input className="input" type="int" />
            <span> km</span>
          </div>
        </div>
      </div>
    </StyledWalkLog>
  );
}

export default WalkLogCreate;
