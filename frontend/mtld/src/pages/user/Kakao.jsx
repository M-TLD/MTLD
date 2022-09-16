import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Kakao() {
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  console.log(kakaoCode);

  const navigate = useNavigate();

  axios({
    method: 'GET',
    url: `http://localhost:8080/login/oauth2/kakao?code=${kakaoCode}`,
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.localStorage.setItem('accessToken', res.data.tokenDto.accessToken);
        window.localStorage.setItem('accessTokenExp', res.data.tokenDto.tokenExpiresIn);
        window.localStorage.setItem('refreshToken', res.data.tokenDto.refreshToken);
        window.localStorage.setItem('refreshTokenExp', res.data.tokenDto.refreshTokenExpiresIn);
      } else {
        window.alert('로그인에 실패하였습니다. 로그인화면으로 돌아갑니다.');
        navigate('/login');
      }
    })
    .catch((error) => {
      console.log('error status code:', error.request.status);
      window.alert('로그인에 실패하였습니다. 로그인화면으로 돌아갑니다.');
      navigate('/login');
    });

  return (
    <div className="kakao">
      Kakao
    </div>
  );
}

export default Kakao;
