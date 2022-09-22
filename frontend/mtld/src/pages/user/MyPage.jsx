import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RegisteredPet from 'components/petinfo/RegisteredPet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axiosInstance from 'components/auth/axiosConfig';

const Wrap = styled.div`
  margin: 0;
  padding: 0;

  .title {
    margin-left: 5vw;
    text-align: left;
    color: #5c5c5c;
  }

  .addPuppy {
    padding-top: 5vh;
    border-radius: 10px;
    margin: 5vh 2vh;
    height: 15vh;
    background-color: #f6f6f6;
    border: 3px solid #ffeeb1;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  width: 100vw;
  height: 19vh;
  background-color: #fff4cb;

  h3 {
    padding: 0;
    margin: 0;
    color: #dfba88;
  }

  .userInfoDiv {
    padding-top: 3vh;
    padding-left: 3vh;
  }

  span {
    font-size: 80%;
    font-weight: 1;
  }

  .delete {
    color: #f38181;
  }

  .editUserInfo {
    color: #5c5c5c;
  }

  .userInfoLink {
    padding-top: 1vh;
    padding-left: 3vh;
  }
`;

const PetInfo = styled.div``;

function MyPage() {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    axiosInstance.get('/user/1');
  });

  return (
    <Wrap>
      <UserInfo>
        <div className="userInfoDiv">
          <h3>이메일</h3>
          {/* <span>{user.payload.email}</span> */}
          <h3>닉네임</h3>
          {/* <span>{user.payload.name}</span> */}
        </div>
        <div className="userInfoLink">
          <span className="editUserInfo">수정하기</span>
          <span>|</span>
          <span className="delete">탈퇴하기</span>
        </div>
      </UserInfo>
      <PetInfo>
        <h2 className="title">등록된 반려견</h2>
        <RegisteredPet />
      </PetInfo>
      <Link to="/pet-info-create" style={{ textDecoration: 'none' }}>
        <div className="addPuppy">
          <AddCircleIcon sx={{ color: '#5c5c5c' }} fontSize="large" />
          <p style={{ color: '#5c5c5c', margin: '0' }}>새로운 가족을 만났나요?</p>
        </div>
      </Link>
    </Wrap>
  );
}

export default MyPage;
