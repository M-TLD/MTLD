//  edit

import { React, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchPupInfo, puppySelector, editPuppyInfo } from 'app/puppy';
import puppyface from 'assets/puppyface.png';
import { isFulfilled } from '@reduxjs/toolkit';

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

function PetInfoEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const puppy = useSelector(puppySelector);
  const params = useParams();

  const [dateValue, setDateValue] = useState('2022-10-07T00:00:00');
  const [birthdateValue, setBirthdateValue] = useState('');
  const [breedIdValue, setBreedIdValue] = useState(0);
  const [diseaseValue, setDiseaseValue] = useState('');
  const [fileURLValue, setFileURLValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [neuterValue, setNeuterValue] = useState(true);
  const [weightValue, setWeightValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const action = await dispatch(fetchPupInfo(params.petId));
      if (isFulfilled(action)) {
        return action.payload.data;
      }
    };
    loadData().then((pup) => {
      setDiseaseValue(pup.disease);
      setBreedIdValue(pup.breedName);
      setDateValue(pup.birthdate);
      setFileURLValue(pup.fileURL);
      setGenderValue(pup.gender);
      setNameValue(pup.name);
      setNeuterValue(pup.neuter);
      setWeightValue(pup.weight);
      setImage(pup.fileURL);
    });
  }, []);

  const parsedData = {
    id: params.petId,
    disease: diseaseValue,
    neuter: neuterValue,
    weight: weightValue,
  };

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

  const handleChange = (newValue) => {
    setDateValue(newValue);
    const birthDate = newValue.$d;
    const parsedBirthDate = birthDate.toISOString().slice(0, 10);
    setBirthdateValue(parsedBirthDate);
  };

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
      setImage(puppy.pupInfo.fileURL);
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

  const editButton = async () => {
    let action = '';
    action = await dispatch(editPuppyInfo([fileURLValue, parsedData]));
    if (isFulfilled(action)) {
      const dogId = action.payload.data;
      console.log(action);
      navigate(`/pet-info-detail/${dogId}`);
    }
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
          <TextField
            onChange={onNameChange}
            id="standard-basic"
            label="이름은 수정할 수 없습니다"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={nameValue}
            disabled
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
          <TextField
            onChange={onBreedIdChange}
            id="standard-basic"
            label="견종은 수정할 수 없습니다"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={breedIdValue}
            disabled
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="생년월일/입양일"
            inputFormat="YYYY/MM/DD"
            value={dateValue}
            disabled
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
                  label="생년월일/입양일은 수정할 수 없습니다"
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
            InputLabelProps={{ shrink: true }}
            onChange={onWeightChange}
            value={weightValue}
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
          <TextField id="standard-basic" label="병력" variant="standard" onChange={onDiseaseChange} value={diseaseValue} />
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
                color: '#b5b5b5',
              }}
            >
              성별은 수정할 수 없습니다
            </FormLabel>
            <div className="radioDiv">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ gap: '15vw', color: '#B5B5B5' }}
                onChange={onGenderChange}
                value={genderValue === '♂' ? 'MALE' : 'FEMALE'}
                disabled
              >
                <FormControlLabel value="FEMALE" control={<Radio />} sx={{ color: '#B5B5B5' }} label="여아" labelPlacement="end" />
                <FormControlLabel value="MALE" control={<Radio />} sx={{ color: '#B5B5B5' }} label="남아" labelPlacement="end" />
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
                value={neuterValue.toString()}
              >
                <FormControlLabel value="true" control={<Radio />} label="예" labelPlacement="end" />
                <FormControlLabel value="false" control={<Radio />} label="아니오" labelPlacement="end" />
              </RadioGroup>
            </div>
          </Box>
        </RadioWrap>
      </PetInfoInput>
      <RegisterButton onClick={editButton}>수정하기</RegisterButton>
    </Wrap>
  );
}

export default PetInfoEdit;
