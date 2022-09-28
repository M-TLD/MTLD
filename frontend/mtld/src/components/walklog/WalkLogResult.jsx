import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledWalkResult = styled.div`
  display: flex;
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  flex-direction: column;
  box-shadow: 4px 4px #e6e4e4;
  padding-top: 1vh;
  padding-bottom: 1vh;
  color: #5c5c5c;
  width: 330px; // 캘린더 기본 너비: 350px

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1vh;
    margin-right: 1vh;
  }

  .hr {
    width: 330px;
    background-color: #a4a4a4;
    height: 1px;
  }

  .text {
    font-size: 0.9rem;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }

  .result {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1vh;
    margin-bottom: 1vh;
    gap: 30px;
  }

  .result-item {
    display: flex;
    flex-direction: row;
  }

  .item {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    background-color: #eafed1;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 1vh;
  }

  .value {
    font-size: 0.8rem;
    margin: 1vh;
  }
`;

const TabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  list-style: none;
  border-bottom: solid 2px #e5e5e5;
  margin: 0;

  .submenu {
    margin: 0;
  }

  .submenu-focused {
    color: #81e3d7;
  }
`;

function WalkLogResult() {
  const date = useSelector((state) => state.date.value);

  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  const newDate = `${year}년 ${month}월 ${day}일`;

  const [time, setTime] = useState(2.5);
  const [distance, SetDistance] = useState(5);

  const printTime = `${time} 시간`;
  const printDistance = `${distance} km`;

  // 반려견별 탭 설정
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    {
      name: '보비',
      content: (
        <div className="result">
          <div className="result-item">
            <div className="item">시간</div>
            <div className="value">22분</div>
          </div>
          <div className="result-item">
            <div className="item">거리</div>
            <div className="value">4km</div>
          </div>
        </div>
      ),
    },
    {
      name: '댕댕이',
      content: (
        <div className="result">
          <div className="result-item">
            <div className="item">시간</div>
            <div className="value">{printTime}</div>
          </div>
          <div className="result-item">
            <div className="item">거리</div>
            <div className="value">{printDistance}</div>
          </div>
        </div>
      ),
    },
  ];
  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <StyledWalkResult>
      <div className="title">
        <span>산책일지</span>
        <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} />
      </div>

      <hr className="hr" />

      <TabMenu>
        {menuArr.map((ele, index) => (
          <li
            role="presentation"
            onKeyDown={console.log()}
            key={index}
            className={currentTab === index ? 'submenu-focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {ele.name}
          </li>
        ))}
      </TabMenu>
      <p className="text">{newDate}</p>
      <h1>{menuArr[currentTab].content}</h1>
    </StyledWalkResult>
  );
}

export default WalkLogResult;
