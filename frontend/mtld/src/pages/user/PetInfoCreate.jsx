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

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  color: #5C5C5C;

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
    border-color: #FFEEB1;
    z-index: -1;
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
    background-color: #FFEEB1;
    border-radius: 50%;
    color: white;
  }
`;

const PetInfoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #5C5C5C;

  .input{
    margin-bottom: 2%;
  }
`;

const RegisterButton = styled.button`
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #FFEEB1;
  box-shadow: 0px 2px 5px 0.1px #5C5C5C;
  font-family: GmarketSansMedium;
  border-radius: 10px;
`;

function PetInfoCreate() {
  const [Image, setImage] = useState('');
  const fileInput = useRef(null);
  const onLoadFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage('');
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
            className="uploadedImage"
            src={Image}
            round
            sx={{ width: '180px', height: '180px' }}
            onClick={() => { fileInput.current.click(); }}
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
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />

        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="견종" variant="standard" />
        </Box>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="견종" variant="standard" />
        </Box>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="견종" variant="standard" />
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

        <TextField
          id="date"
          label="생년월일(입양일)"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-number"
          label="몸무게"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="여아" />
          <FormControlLabel value="male" control={<Radio />} label="남아" />
        </RadioGroup>

        <FormLabel id="demo-row-radio-buttons-group-label">중성화여부</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="O" />
          <FormControlLabel value="male" control={<Radio />} label="X" />
        </RadioGroup>

        <div className="input">
          <label htmlFor="birthdate">생년월일</label>
          <input id="birthdate" type="text" />
        </div>

        <div className="input">
          <label htmlFor="weight">몸무게</label>
          <input id="weight" type="number" />
        </div>

      </PetInfoInput>
      <RegisterButton>
        등록하기
      </RegisterButton>
    </Wrap>
  );
}

export default PetInfoCreate;
