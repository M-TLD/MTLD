import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { update } from 'app/date';

import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PetsIcon from '@mui/icons-material/Pets';

const StyledCalender = styled.div`
  .div {
  }

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    // border: 2px solid #5c5c5c;
    // border-radius: 5px;
    font-family: GmarketSansMedium;
    line-height: 1.125em;
    margin-bottom: 2vh;
    margin-right: 0;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    // font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    // 요일
    padding: 0.5em;
    color: #5c5c5c;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    // 주말
    color: black;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    // 이전, 이후 날짜 (색 더 연하게)
    color: #bfbdbd;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    // 전체 타일 (변경 시 전체 반영!)
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-family: GmarketSansMedium;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    // 오늘 날짜 (앱 메인 색으로 변경)
    background: #ffeeb1;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #eafed1;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #eafed1;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }

  .diaryicon {
    width: 15px;
    margin-right: 0.2vh;
    margin-left: 0.2vh;
    color: #a0cd95;
  }

  .peticon {
    width: 15px;
    margin-right: 0.2vh;
    margin-left: 0.2vh;
    color: #5da2eb;
  }
`;

function CalenderView() {
  const date = useSelector((state) => state.date.value);
  const dispatch = useDispatch();

  const [value, onChange] = useState(new Date());

  const selectedYear = value.getFullYear();
  const selectedMonth = String(value.getMonth() + 1).padStart(2, '0');
  const selectedDate = String(value.getDate()).padStart(2, '0');

  const dateValue = `${selectedYear}-${selectedMonth}-${selectedDate}`;

  useEffect(() => {
    dispatch(update(dateValue));
  });

  const [diaryData, setDiaryData] = useState(['1900-01-01']);
  const [walkingData, setWalkingData] = useState([]);
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
        if (data.walkingDateList !== undefined) {
          setWalkingData(data.walkingDateList);
        }
      });
  }, [date]);

  return (
    <StyledCalender>
      <div className="div">
        <Calender
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })} // 날짜에서 '일' 글자 제외
          locale="eng-US"
          tileContent={({ date, view }) => {
            const html = [];
            if (diaryData.find((x, idx) => x === moment(date).format('YYYY-MM-DD'))) {
              html.push(<EventNoteRoundedIcon className="diaryicon" />);
            }
            if (walkingData.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              html.push(<PetsIcon className="peticon" />);
            }
            return <div className="flex justify-center items-center absoluteDiv">{html}</div>;
          }}
        />
      </div>
    </StyledCalender>
  );
}

export default CalenderView;
