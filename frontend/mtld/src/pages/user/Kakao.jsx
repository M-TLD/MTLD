import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import mtldLogo from 'assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'app/user';

const Logo = styled.img`
  width: 80vw;
  margint-top: 15%;
  margin-bottom: 10%;
`;

const StyledDiv = styled.div`
  .text {
    font-family: 'UhBeemunseulye';
    font-size: 1.5rem;
  }
`;

function Kakao() {
  const user = useSelector((state) => state.user.value);
  // 이렇게 하면 {email: 'sam8034@naver.com', name: '규민'}
  console.log(user.payload);
  const dispatch = useDispatch();
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  console.log(kakaoCode);

  const navigate = useNavigate();
  useEffect(() => {
    axios({ method: 'GET', url: `http://localhost:8080/login/oauth2/kakao?code=${kakaoCode}` })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(login({ email: res.data.oauthId, name: res.data.name }));
          window.localStorage.setItem('accessToken', res.data.tokenDto.accessToken);
          window.localStorage.setItem('accessTokenExp', res.data.tokenDto.tokenExpiresIn);
          window.localStorage.setItem('refreshToken', res.data.tokenDto.refreshToken);
          window.localStorage.setItem('refreshTokenExp', res.data.tokenDto.refreshTokenExpiresIn);
          navigate('/');
        } else {
          window.alert('로그인에 실패하였습니다. 로그인 화면으로 돌아갑니다.');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('error status code:', error.request.status);
        window.alert('로그인에 실패하였습니다. 로그인 화면으로 돌아갑니다.');
        navigate('/login');
      });
  }, []);

  return (
    <StyledDiv>
      <Logo src={mtldLogo} />
      <div className="text">
        <p>멍더랜드에 온 것을 환영하개</p>
        <p>로그인 하는 동안 조금만 기다려조</p>
      </div>
    </StyledDiv>
  );
}

export default Kakao;
