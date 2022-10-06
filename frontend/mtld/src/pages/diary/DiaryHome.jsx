import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CalenderView from 'components/common/CalendarView';
import WalkLog from 'components/walklog/WalkLog';
import mtldLogo from 'assets/logo.png';

const StyledDiaryHome = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 1vh;

  .walklog {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .click {
    color: #ffffff;
  }

  .report {
    font-family: UhBeeStrawberry;
    font-weight: bold;
  }
`;

const StyledLink = styled(NavLink)`
  width: 330px;
  height: 5vh;
  text-decoration: none;
  background-color: #ffdcdc;
  border-radius: 8px;
  // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
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
  const date = useSelector((state) => state.date.value);

  const [diaryData, setDiaryData] = useState(['1900-01-01']);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/diary`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.recordDateList !== undefined) {
          setDiaryData(data.recordDateList);
        }
      });
  }, []);

  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;

  return (
    <StyledDiaryHome>
      <CalenderView />

      {dateString >= date ? (
        <div>
          <div className="walklog">
            <WalkLog />
          </div>

          {/* 다이어리 */}
          {/* 해당하는 값이 없을 경우 (status 이용): 다이어리 작성하러 가기 */}
          {/* 해당하는 값이 있는 경우: 다이어리 디테일 (오늘의 다이어리) */}
          {diaryData.length > 0 && diaryData.includes(date) ? (
            <StyledLink to={`/diary/${date}`}>
              <div className="content">
                <span>다이어리 확인하기! </span>
                <span className="click">Click</span>
              </div>
            </StyledLink>
          ) : (
            <StyledLink to="/diary-create">
              <div className="content">
                <span>다이어리 작성하기! </span>
                <span className="click">Click</span>
              </div>
            </StyledLink>
          )}
        </div>
      ) : (
        <div className="report">
          <img src={mtldLogo} alt="logo" width="300px" />
          <p>오늘 이후의 날짜에는 작성할 수 없어요!</p>
        </div>
      )}
    </StyledDiaryHome>
  );
}

export default DiaryHome;
