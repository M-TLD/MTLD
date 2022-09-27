import React from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Paw from 'assets/paw_blue.png';

import ImageCarousel from 'components/walklog/ImageCarousel';

const StyledDetail = styled.div`
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

function DiaryDetail() {
  return (
    <StyledDetail>
      <div className="top">
        <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} />
        <ImageOutlinedIcon id="photo" sx={{ color: '#F4C7AB' }} />
        <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} />
      </div>
      <br />
      <div>
        {/* 해당 날짜에 산책 기록이 있으면 발자국 표시 */}
        <PawImage src={Paw} />
      </div>
      <ImageCarousel />
    </StyledDetail>
  );
}

export default DiaryDetail;
