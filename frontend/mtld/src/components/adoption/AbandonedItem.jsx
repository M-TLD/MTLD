import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StyledItem = styled.div`
  margin: 1.5vh;
  width: 150px;
  color: #5c5c5c;
  background-color: #ffeeb1;
  border-radius: 4px;

  .img {
    border-radius: 30px;
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
  return (
    <NavLink to={`/puppy-detail/${item.id}`}>
      <StyledItem>
        <div className="img">
          <img
            width="150px"
            height="100px"
            style={{ borderRadius: '4px 4px 0 0' }}
            src={item.img}
            alt="thumbnailimage"
          />
        </div>
        <p className="text">
          <span> [보호중] </span>
          <span>{item.breed}</span>
          <span> | </span>
          <span>{item.sex}</span>
          <span> | 중성화 </span>
          <span>{item.neutered}</span>
        </p>
        <p className="location">
          <span>
            <StyledLocationOnOutlinedIcon fontSize="small" />
          </span>
          <span>{item.location}</span>
        </p>
      </StyledItem>
    </NavLink>
  );
}

export default AbandonedItem;
