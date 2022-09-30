import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import RegisteredPet from 'components/petinfo/RegisteredPet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axiosInstance from 'components/auth/axiosConfig';
import { login } from 'app/user';
import Spinner from 'components/common/Spinner';
import { fetchPuppyInfo, puppySelector } from 'app/puppy';

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
  height: 18vh;
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

  .subDiv {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  span {
    // font-size: 100%;
    color: #5c5c5c;
    margin-right: 10px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .delete {
    color: #f38181;
  }

  .editUserInfo {
    color: #5c5c5c;
  }

  .userInfoLink {
    padding-top: 3vh;
    padding-left: 3vh;
  }
`;

const PetInfo = styled.div`
  margin-bottom: 8vh;
`;

function MyPage() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const puppy = useSelector(puppySelector);

  useEffect(() => {
    axiosInstance
      .get('api/user')
      .then((res) => {
        dispatch(login({ id: res.data.id, email: res.data.oauthId, name: res.data.name }));
        console.log('user information:', res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('login fail. go back to login page');
        console.log(err);
        navigate('/login');
      });
    dispatch(fetchPuppyInfo());
  }, []);

  if (!puppy.puppyInfo) {
    return <Spinner />;
  }

  if (puppy.puppyInfo.length === 3) {
    return (
      <Wrap>
        <UserInfo>
          <div className="userInfoDiv">
            <div className="subDiv">
              <h3>이메일</h3>
              <span>{user.payload.email}</span>
            </div>
            <div className="subDiv">
              <h3>닉네임</h3>
              <span>{user.payload.name}</span>
            </div>
          </div>
          <div className="userInfoLink">
            <p>
              <span className="editUserInfo">수정하기</span>
              <span>|</span>
              <span className="delete">탈퇴하기</span>
            </p>
          </div>
        </UserInfo>
        <PetInfo>
          <h2 className="title">등록된 반려견</h2>
          <RegisteredPet />
          <p>3마리 이상은 등록할 수 없어요!😭</p>
        </PetInfo>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <UserInfo>
        <div className="userInfoDiv">
          <div className="subDiv">
            <h3>이메일</h3>
            <span>{user.payload.email}</span>
          </div>
          <div className="subDiv">
            <h3>닉네임</h3>
            <span>{user.payload.name}</span>
          </div>
        </div>
        <div className="userInfoLink">
          <p>
            <span className="editUserInfo">수정하기</span>
            <span>|</span>
            <span className="delete">탈퇴하기</span>
          </p>
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
