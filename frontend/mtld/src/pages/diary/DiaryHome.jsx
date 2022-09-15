import React from 'react';
import styled from 'styled-components';
import CalenderView from 'components/common/CalendarView';
import WalkLogCreate from 'components/walklog/WalkLogCreate';

const StyledDiaryHome = styled.div`
  .div {
    display: flex;
    justify-content: center;
  }
`;

function DiaryHome() {
  return (
    <StyledDiaryHome>
      <div className="div" />
      <CalenderView />
    </StyledDiaryHome>
  );
}

export default DiaryHome;
