import React from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Paw from 'assets/paw_blue.png';

import { useSelector } from 'react-redux';

const StyledCreate = styled.div`
  .top {
    display: relative;
    margin-top: 2vh;
  }

  #close {
    position: absolute;
    left: 2%;
  }

  #photo {
    position: absolute;
    right: 35px;
  }

  #check {
    position: absolute;
    right: 2%;
  }
`;

const PawImage = styled.img`
  width: 30px;
  height: 30px;
`;

function DiaryCreate() {
  const date = useSelector((state) => state.date.value);
  // console.log('reducer', date);

  console.log(date);

  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  const newDate = `${year}년 ${month}월 ${day}일`;
  console.log(newDate);

  return (
    <StyledCreate>
      <div className="top">
        <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} />
        <ImageOutlinedIcon id="photo" sx={{ color: '#F4C7AB' }} />
        <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} />
      </div>
      <br />
      <div>
        <PawImage src={Paw} />
      </div>
      <div>
        <p>{newDate}</p>
      </div>
    </StyledCreate>
  );
}

export default DiaryCreate;
