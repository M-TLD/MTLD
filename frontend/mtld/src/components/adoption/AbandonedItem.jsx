import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StyledItem = styled.div`
  margin: 1.5vh;
  width: 150px;
  color: #5c5c5c;
  padding-bottom: 2px;
  background-color: #ffeeb1;
  border-radius: 4px;

  .img {
    width: 150px;
    height: 100px;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    object-fit: cover;
  }

  .text {
    text-align: left;
    font-size: 10px;
    word-wrap: break-word;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 5px;
    margin-right: 5px;
  }

  .location {
    display: flex;
    align-items: center;
    text-align: left;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 10px;
  }
`;

const StyledLocationOnOutlinedIcon = styled(LocationOnOutlinedIcon)`
  width: 1px;
  color: #5c5c5c;
`;

function AbandonedItem({ item }) {
  // 중성화 여부의 Y, N, U를 O, X, 알수없음으로 변경
  const [neutered, setNeutered] = useState();

  useEffect(() => {
    if (item.neuterYn === 'Y') {
      setNeutered('O');
    } else if (item.neuterYn === 'N') {
      setNeutered('X');
    } else {
      setNeutered('알수없음');
    }
  });

  return (
    <NavLink to={`/abandoned-detail/${item.desertionNo}`} style={{ textDecoration: 'none' }}>
      <StyledItem>
        <div>
          <img className="img" src={item.popfile} alt="thumbnailimage" />
        </div>
        <p className="text">
          <span>{item.kindCd.substring(4)}</span>
          <span> | </span>
          <span>{item.sexCd === 'F' ? '여' : '남'}</span>
          <span> | 중성화 </span>
          <span>{neutered}</span>
        </p>
        <p className="location">
          <span>
            <StyledLocationOnOutlinedIcon fontSize="small" />
          </span>
          <span>{item.careAddr}</span>
        </p>
      </StyledItem>
    </NavLink>
  );
}

export default AbandonedItem;
