import React from 'react';
import axios from 'axios';

function Kakao() {
  // const kakaoCode = useLocation();
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  console.log(kakaoCode);

  axios({
    method: 'GET',
    url: `http://localhost:8080/login/oauth2/kakao?code=${kakaoCode}`,
  })
    .then((res) => console.log(res));
  return (
    <div className="kakao">
      Kakao
    </div>
  );
}

export default Kakao;
