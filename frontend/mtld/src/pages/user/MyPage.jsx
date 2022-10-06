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
  height: 17vh;
  background-color: #fff4cb;

  h3 {
    padding: 0;
    margin: 0;
    color: #dfba88;
  }

  .userInfoDiv {
    padding: 5vh 3vh;
  }

  .subDiv {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 1vh;
  }

  span {
    // font-size: 100%;
    color: #5c5c5c;
    margin-right: 10px;
    font-size: 14px;
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
        // console.log('user information:', res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('login fail. go back to login page');
        navigate('/login');
      });
    dispatch(fetchPuppyInfo());
  }, []);

  if (!puppy.puppyInfo || isLoading) {
    return <Spinner />;
  }

  if (puppy.puppyInfo.length === 3 && !isLoading) {
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
