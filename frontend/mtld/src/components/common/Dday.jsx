import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { puppySelector } from 'app/puppy';

const Wrap = styled.div`
  font-size: 90%;
  font-weight: 90;

  form {
    display: none;
  }

  p {
    color: #bfc3c7;
  }
`;

function Dday() {
  const puppy = useSelector(puppySelector);
  const [dateInput, setDateInput] = useState(`${puppy.puppyInfo.birthdate}T00:00:00`);
  const [dDayCounter, setDdayCounter] = useState(0);

  const handleChange = (newValue) => {
    setDateInput(newValue);
  };

  useEffect(() => {
    // 현재 시각까지 나오는거
    const rawToday = new Date();
    // 시각 떼버리는거
    const today = rawToday.toDateString();
    // 떼버린 시각 00:00:00 으로
    const parsedToday = new Date(`${today} 00:00:00`);
    console.log(rawToday);
    console.log(today);
    // 설정해준 target date
    const dday = new Date(dateInput);

    // 디데이 카운터
    setDdayCounter(Math.ceil((dday - parsedToday) / 86400000));
  });

  return (
    <Wrap>
      <p>
        🥳
        {dDayCounter} 일 남았어요!
      </p>
      <LocalizationProvider dateAdapter={AdapterDayjs} className="test">
        <DatePicker
          className="test"
          label="생년월일/입양일"
          inputFormat="YYYY/MM/DD"
          value={dateInput}
          onChange={handleChange}
          renderInput={({ inputRef, inputProps }) => (
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                ref={inputRef}
                {...inputProps}
                id="date"
                label="생년월일/입양일"
                variant="standard"
                InputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
                InputLabelProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
              />
            </Box>
          )}
        />
      </LocalizationProvider>
    </Wrap>
  );
}

export default Dday;
