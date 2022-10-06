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
  const [dateInput, setDateInput] = useState(`${puppy.pupInfo.birthdate}T00:00:00`);
  const [dDayCounter, setDdayCounter] = useState(0);

  const handleChange = (newValue) => {
    setDateInput(newValue);
  };

  const dday = new Date(dateInput);

  useEffect(() => {
    const today = new Date(); // 오늘 날짜 객체 생성
    const yy = today.getFullYear();
    const mm = dday.getMonth();
    const dd = dday.getDate();

    const birthDay = new Date(yy, mm, dd);
    let diffDate = Math.ceil((birthDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDate < 0) {
      diffDate = 365 + diffDate;
    }

    setDdayCounter(diffDate);
  });

  return (
    <Wrap>
      <p style={{ fontSize: '100%' }}>🥳 {dDayCounter} 일 남았어요!</p>
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
