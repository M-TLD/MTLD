import React from 'react';
import styled from 'styled-components';
import kakaoLogin from 'assets/kakao-login.png';
import mtldLogo from 'assets/logo.png';
import pawStamp from 'assets/paw.png';
import welcomeNote from 'assets/welcome-note.png';
import { useMediaQuery } from 'react-responsive';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: -25%;
`;

const Logo = styled.img`
  width: 80vw;
  margint-top: 15%;
  margin-bottom: 10%;
`;

const Wrap = styled.div`
  position: relative;
`;

const Note = styled.img`
  width: 90vw;
  margin-bottom: 3%;
`;

const NoteText = styled.div`
  position: absolute;
  top: 47%;
  left: 50%;
  width: 100%;
  transform: translate( -50%, -50%);
  line-height: 0.5rem;
  font-size: 2rem;
  font-family: 'UhBeemunseulye';
  text-align: center;
`;

const NoteImage = styled.div`

`;

const Paw = styled.img`
  position: absolute;
  top: 63%;
  left: 65%;
  width: 20%;
  transform: rotate(40deg);
`;

const KakaoBtn = styled.img`
  width: 80vw;
  margin-bottom: 5%;
`;

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 831 });
  return isDesktop ? children : null;
};

const DesktopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DesktopLogo = styled.img`
  width: 40vw;
  margin-bottom: 5%;
  margin-top: 3%;
`;

const DesktopKakaoBtn = styled.img`
  width: 40vw;
`;

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 830 });
  return isMobile ? children : null;
};

function Login() {
  const KAKAO_CLIENT_ID = 'b16fa4858c60ea9d4f042ea3b51165db';
  const REDIRECT_URI = 'http://localhost:3000/login/oauth2/kakao';
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="login">
      <Desktop>
        <DesktopWrap>
          <DesktopLogo src={mtldLogo} />
          <a href="http://localhost:3000/">
            <DesktopKakaoBtn src={kakaoLogin} />
          </a>
        </DesktopWrap>
      </Desktop>
      <Mobile>
        <Container>
          <Logo src={mtldLogo} />
          <Wrap>
            <NoteImage>
              <Note src={welcomeNote} />
            </NoteImage>
            <NoteText>
              <p>멍! THE LAND</p>
              <p>모든 강아지들의</p>
              <p>원더랜드,</p>
              <p>멍더랜드에 온 걸</p>
              <p>환영하개</p>
            </NoteText>
            <Paw src={pawStamp} />
          </Wrap>
          <a href={KAKAO_AUTH_URI}>
            <KakaoBtn src={kakaoLogin} />
          </a>
        </Container>
      </Mobile>
    </div>
  );
}

export default Login;
