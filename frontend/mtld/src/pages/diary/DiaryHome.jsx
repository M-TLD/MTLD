import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CalenderView from 'components/common/CalendarView';
import WalkLogCreate from 'components/walklog/WalkLogCreate';
import WalkLogResult from 'components/walklog/WalkLogResult';

const StyledDiaryHome = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: 350px;
  height: 5vh;
  text-decoration: none;
  background-color: #ffdcdc;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;

  .content {
    font-size: 13pt;
  }
`;

function DiaryHome() {
  return (
    <StyledDiaryHome>
      <CalenderView />

      <div>
        {/* 산책일지 */}
        {/* 해당하는 값이 있는 경우: Result, 없는 경우: Create */}
        <WalkLogCreate />
        <WalkLogResult />
      </div>

      {/* 다이어리 */}
      {/* 해당하는 값이 없을 경우 (status 이용): 다이어리 작성하러 가기 */}
      {/* 해당하는 값이 있는 경우: 다이어리 디테일 (오늘의 다이어리) */}
      <StyledLink to="/diary-create">
        <div className="content">다이어리 작성하러 가기</div>
      </StyledLink>
    </StyledDiaryHome>
  );
}

export default DiaryHome;
