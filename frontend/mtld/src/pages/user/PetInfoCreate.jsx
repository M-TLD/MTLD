import { React, useState, useRef, useEffect } from 'react';
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
import axiosInstance from 'components/auth/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addPuppyInfo } from 'app/puppy';
import puppyface from 'assets/puppyface.png';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioWrap = styled.div`
  margin: 1vh 0;
  text-align: start;

  .radioDiv {
    display: flex;
    justify-content: center;
  }
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
  const dispatch = useDispatch();

  // const formData = new FormData();

  const [dateValue, setDateValue] = useState(dayjs('2014-08-18T21:11:54'));
  const [birthdateValue, setBirthdateValue] = useState('');
  const [breedIdValue, setBreedIdValue] = useState(1);
  const [diseaseValue, setDiseaseValue] = useState('');
  const [fileURLValue, setFileURLValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [neuterValue, setNeuterValue] = useState(true);
  const [weightValue, setWeightValue] = useState(0);

  const onBreedIdChange = (e) => {
    setBreedIdValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onDiseaseChange = (e) => {
    setDiseaseValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onGenderChange = (e) => {
    setGenderValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onNameChange = (e) => {
    setNameValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onNeuterChange = (e) => {
    setNeuterValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onWeightChange = (e) => {
    setWeightValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const parsedData = {
    birthdate: birthdateValue,
    code: breedIdValue,
    disease: diseaseValue,
    gender: genderValue,
    name: nameValue,
    neuter: neuterValue,
    weight: weightValue,
  };

  const handleChange = (newValue) => {
    setDateValue(newValue);
    const birthDate = newValue.$d;
    const parsedBirthDate = birthDate.toISOString().slice(0, 10);
    setBirthdateValue(parsedBirthDate);
  };
  console.log(birthdateValue);

  const [Image, setImage] = useState(puppyface);
  const fileInput = useRef(null);

  const onLoadFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0].name);

      // formData.append('image', event.target.files[0]);

      if (Image) {
        setFileURLValue(event.target.files[0]);
      }
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
            // round="true"
            sx={{ width: '180px', height: '180px' }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input ref={fileInput} className="upload-btn" type="file" name="profile-image" id="profile" accept="image/*" onChange={onLoadFile} />
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
          <TextField onChange={onNameChange} id="standard-basic" label="이름" variant="standard" />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={onBreedIdChange} id="standard-basic" label="견종" variant="standard" type="number" />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="생년월일/입양일"
            inputFormat="YYYY/MM/DD"
            value={dateValue}
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
            onChange={onWeightChange}
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
          <TextField id="standard-basic" label="병력" variant="standard" onChange={onDiseaseChange} />
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
            <div className="radioDiv">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ gap: '15vw' }}
                onChange={onGenderChange}
              >
                <FormControlLabel value="FEMALE" control={<Radio />} label="여아" labelPlacement="end" />
                <FormControlLabel value="MALE" control={<Radio />} label="남아" labelPlacement="end" />
              </RadioGroup>
            </div>
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
            <div className="radioDiv">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ gap: '15vw' }}
                onChange={onNeuterChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="예" labelPlacement="end" />
                <FormControlLabel value="false" control={<Radio />} label="아니오" labelPlacement="end" />
              </RadioGroup>
            </div>
          </Box>
        </RadioWrap>
      </PetInfoInput>
      <RegisterButton
        onClick={() => {
          // console.log(parsedData);
          dispatch(addPuppyInfo([fileURLValue, parsedData]));
          // axiosRequest();
        }}
      >
        등록하기
      </RegisterButton>
    </Wrap>
  );
}

export default PetInfoCreate;
