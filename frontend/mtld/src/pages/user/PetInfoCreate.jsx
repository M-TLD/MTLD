import { React, useState, useRef } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import puppyface from 'assets/puppyface.png';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioWrap = styled.div`
  margin: 1vh 0;
`;

const Title = styled.div`
  display: flex;
  color: #5c5c5c;

  h1 {
    margin-bottom: 5%;
  }
`;

const PetImage = styled.div`
  .buttonWrap {
    position: relative;
  }

  .uploadedImage {
    border: 8px solid;
    border-color: #ffeeb1;
  }

  .upload-btn {
    display: none;
  }

  .btn-shown {
    position: absolute;
    top: 68%;
    left: 78%;
    height: 25%;
    width: 25%;
    border: none;
    background-color: #ffeeb1;
    border-radius: 50%;
    color: white;
  }
`;

const PetInfoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #5c5c5c;

  .input {
    margin-bottom: 2%;
  }
`;

const RegisterButton = styled.button`
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #ffeeb1;
  box-shadow: 0px 2px 5px 0.1px #5c5c5c;
  font-family: GmarketSansMedium;
  border-radius: 10px;
`;

function PetInfoCreate() {
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [Image, setImage] = useState(puppyface);
  const fileInput = useRef(null);
  const onLoadFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage(puppyface);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log(reader);
  };

  console.log(Image);

  return (
    <Wrap>
      <Title>
        <h1>반려견 정보 등록</h1>
      </Title>
      <PetImage>
        <div className="buttonWrap">
          <Avatar
            alt="puppyface"
            className="uploadedImage"
            src={Image}
            round
            sx={{ width: '180px', height: '180px' }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input
            ref={fileInput}
            className="upload-btn"
            type="file"
            name="profile-image"
            id="profile"
            accept="image/*"
            onChange={onLoadFile}
          />
          <button
            className="btn-shown"
            type="button"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            <CameraAltIcon fontSize="medium" />
          </button>
        </div>
      </PetImage>
      <PetInfoInput>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="이름" variant="standard" />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="생년월일/입양일"
            inputFormat="YYYY/MM/DD"
            value={value}
            onChange={handleChange}
            renderInput={({ inputRef, inputProps, InputProps }) => (
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

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="몸무게"
            variant="standard"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </Box>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="병력" variant="standard" />
        </Box>

        <RadioWrap>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                textalign: 'start',
              }}
            >
              성별
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="여아"
                labelPlacement="start"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="남아"
                labelPlacement="start"
              />
            </RadioGroup>
          </Box>
        </RadioWrap>

        <RadioWrap>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel id="demo-row-radio-buttons-group-label">중성화여부</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="Y" control={<Radio />} label="예" labelPlacement="start" />
              <FormControlLabel
                value="N"
                control={<Radio />}
                label="아니오"
                labelPlacement="start"
              />
            </RadioGroup>
          </Box>
        </RadioWrap>
      </PetInfoInput>
      <RegisterButton>등록하기</RegisterButton>
    </Wrap>
  );
}

export default PetInfoCreate;
