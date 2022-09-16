import React from 'react';
import styled from 'styled-components';
import CalenderView from 'components/common/CalendarView';
import WalkLogCreate from 'components/walklog/WalkLogCreate';

const StyledDiaryHome = styled.div`
  .div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

function DiaryHome() {
  return (
    <StyledDiaryHome>
      <div className="div">
        <CalenderView />
      </div>
    </StyledDiaryHome>
  );
}

export default DiaryHome;
