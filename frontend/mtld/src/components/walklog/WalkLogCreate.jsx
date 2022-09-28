import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1vh;
    margin-right: 1vh;
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
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1vh;
    margin-bottom: 1vh;
    font-size: 0.9rem;
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

function WalkLogCreate() {
  const date = useSelector((state) => state.date.value);

  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  const newDate = `${year}년 ${month}월 ${day}일`;

  return (
    <StyledWalkLog>
      <div className="div">
        <div className="title">
          <span>산책일지</span>
          {/* 체크 버튼 클릭시 */}
          <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} />
        </div>
        <hr className="hr" />
        <p className="text">{newDate}</p>
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
