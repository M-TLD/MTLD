import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RegisteredPet from 'components/petinfo/RegisteredPet';

const Wrap = styled.div`
  margin: 0;
  padding: 0;
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

  return (
    <Wrap>
      <UserInfo>
        <div className="userInfoDiv">
          <h3>이메일</h3>
          <span>{user.payload}</span>
          <h3>닉네임</h3>
          <span>{user.payload}</span>
          <h3>전화번호</h3>
          <span>{user.payload}</span>
        </div>
        <div className="userInfoLink">
          <span className="editUserInfo">수정하기</span>
          <span>|</span>
          <span className="delete">탈퇴하기</span>
        </div>
      </UserInfo>
      <PetInfo>
        <RegisteredPet />
      </PetInfo>
    </Wrap>
  );
}

export default MyPage;
