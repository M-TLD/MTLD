import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DogWalk from 'assets/dogwalk.png';
import { useNavigate } from 'react-router-dom';
import DeleteModal from 'components/common/DeleteModal';

const StyledWalkLog = styled.div`
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  flex-direction: column;
  box-shadow: 4px 4px #e6e4e4;
  padding-top: 1vh;
  padding-bottom: 1vh;
  color: #5c5c5c;
  width: 330px; // 캘린더 기본 너비:350px

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1.5vh;
    margin-right: 1vh;
  }

  .date {
    font-size: 12px;
  }

  .hr {
    width: 330px;
    background-color: #a4a4a4;
    height: 0.5px;
  }

  .text {
    font-size: 13px;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
  }

  .create {
    display: flex;
    flex-direction: column;
  }

  .contentblock {
    margin: 0;
  }

  .form {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1vh;
    margin-bottom: 1vh;
    font-size: 13px;
  }

  .input {
    width: 5vh;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 0.3vh;
    border-color: #a4a4a4;
  }

  .time {
    margin-right: 20px;
  }

  #check {
    margin-left: 300px;
  }

  #check:hover {
    cursor: pointer;
  }

  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1vh;
    margin-bottom: 1vh;
    gap: 30px;
  }

  .result-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .item {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    background-color: #eafed1;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    height: 20px;
  }

  .value {
    font-size: 0.8rem;
    margin-right: 2vh;
    margin-left: 2vh;
  }

  #close {
    margin-left: 300px;
  }

  #delete {
    margin-left: 300px;
  }
`;

const TabMenu = styled.ul`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  list-style: none;
  border-bottom: solid 2px #e5e5e5;
  margin: 0;
  padding: 0;
  padding-top: 0.5vh;

  .submenu {
    margin: 0;
    padding-left: 1vh;
    color: #a9a0a0;
  }

  .submenu:hover {
    cursor: pointer;
  }

  .submenu-focused {
    padding-left: 1vh;
    color: #81e3d7;
  }

  .submenu-focused:hover {
    cursor: pointer;
  }
`;

function WalkLog() {
  const navigate = useNavigate();
  // 현재 선택된 날짜 호출 및 형식 수정
  const date = useSelector((state) => state.date.value);
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const newDate = `${year}년 ${month}월 ${day}일`;

  const [puppyData, setPuppyData] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [status, setStatus] = useState();

  const [printTime, setPrintTime] = useState(0);
  const [printDistance, setPrintDistance] = useState(0);

  const [logId, setLogId] = useState(0);

  const nameArr = [];

  // 로그인된 사용자의 반려견 정보 호출
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/dogs`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setPuppyData(data);
        setCurrentId(data[0].id); // 첫번째 강아지로 Id 고정하고 시작
      });
  }, []);

  // 현재 선택된 강아지의 산책 기록 여부 조회
  const getWalking = { date, dogId: Number(currentId) };

  if (currentId !== 0) {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/diary/walking/date`, {
        params: getWalking,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setStatus(res.status);
        console.log(res);
        setPrintTime(res.data.time);
        setPrintDistance(res.data.distance);
        setLogId(res.data.id);
      });
  }

  // 현재 선택된 반려견 상태 관리

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setCurrentId(puppyData[index].id);
  };

  if (puppyData) {
    for (let i = 0; i < puppyData.length; i += 1) {
      nameArr.push(puppyData[i].name);
    }
  }

  const timeChange = (event) => {
    setTime(event.target.value);
  };

  const distanceChange = (event) => {
    setDistance(event.target.value);
  };

  const walkingAppend = async () => {
    const walking = { diaryDate: date, distance: Number(distance), dogId: currentId, walkingTime: Number(time) };
    const walklog = JSON.stringify(walking);

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/diary/walking`, walklog, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        'content-type': 'application/json',
      },
    });
    if (res.status === 200) {
      navigate('/diary-home');
    }
  };

  const deleteButton = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/diary/walking/${logId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });
    console.log(res);
    if (res.status === 200) {
      navigate('/diary-home');
    }
    console.log('delete!');
  };

  // [0]: 입력 form, [1]: 결과 출력
  const contentArr = [
    {
      content: (
        <div className="create">
          <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} onClick={walkingAppend} />
          <span className="text">오늘 얼만큼 산책했나요?</span>
          <div className="form">
            <div className="time">
              <input className="input" type="int" onChange={timeChange} />
              <span> 시간 </span>
            </div>
            <div className="distance">
              <input className="input" type="int" onChange={distanceChange} />
              <span> km</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="result">
          <div className="deletebutton">
            <DeleteModal submit={deleteButton} id="delete" />
          </div>
          <div className="result-item">
            <div className="item">시간</div>
            <div className="value">{printTime}시간</div>
            <div className="item">거리</div>
            <div className="value">{printDistance}km</div>
          </div>
          <img src={DogWalk} alt="dog-walk" width="60px" style={{ marginLeft: '220px' }} />
        </div>
      ),
    },
  ];

  return (
    <StyledWalkLog>
      <div className="title">
        <span>산책일지</span>
        <span className="date">{newDate}</span>
      </div>

      <TabMenu>
        {nameArr.map((name, index) => (
          <li
            role="presentation"
            onKeyDown={console.log()}
            key={index}
            className={currentTab === index ? 'submenu-focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {name}
          </li>
        ))}
      </TabMenu>
      {status === 204 ? <div className="contentblock">{contentArr[0].content}</div> : <div className="contentblock">{contentArr[1].content}</div>}
    </StyledWalkLog>
  );
}

export default WalkLog;
