import React from 'react';
import styled from 'styled-components';
// import CalenderView from 'components/common/CalendarView';

const StyledWalkLog = styled.div`
  .div {
    margin: 1vh;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    flex-direction: column;
    box-shadow: 4px 4px #e6e4e4;
    padding-top: 1vh;
    padding-bottom: 1vh;
    color: #5c5c5c;
  }

  .title {
    margin-left: 1vh;
    text-align: left;
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
        <p>{date}</p>
        <div>오늘 산책을 했나요?</div>
      </div>
    </StyledWalkLog>
  );
}

export default WalkLogCreate;
