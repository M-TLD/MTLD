import React from 'react';
import styled from 'styled-components';
import Logo from 'assets/mung.png';
import Paw from 'assets/paw_yellow.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

const StyledHeader = styled.header`
  .Contents {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-left: 2vh;
  }

  .right {
    display: flex;
  }

  .goback {
    cursor: pointer;
    color: #5c5c5c;
    font-family: 'UhBeeStrawberry';
    font-size: 19px;
    font-weight: bold;
    padding-right: 4vh;
    margin-left: 0.5vh;
  }

  .paw {
    height: 30px;
  }

  .navBar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .gapDiv {
    display: flex;
    gap: 10px;
  }

  .menuDiv {
    display: flex;
    justify-content: space-between;
  }

  .userDiv {
    display: flex;
    align-items: center;
    gap: 3vw;
  }

  .userInfoDiv {
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: #5c5c5c;
    font-family: 'UhBeeStrawberry';
    font-size: 19px;
    font-weight: bold;
  }

  .name {
    font-size: 20px;
  }
`;

const LogoImage = styled.img`
  height: 4vh;
  z-index: 100;
`;

function Header() {
  const navigate = useNavigate();
  const locationNow = useLocation();
  if (locationNow.pathname === '/login') return null;
  return (
    <StyledHeader>
      <Accordion sx={{ bgcolor: '#ffeeb1', width: '100vw', zIndex: '80', position: 'fixed' }}>
        <AccordionSummary expandIcon={<MenuIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <div className="navBar">
            <Link className="Link" to="/">
              <LogoImage src={Logo} />
            </Link>
            <div className="wrapDiv" />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="menuDiv">
              <div className="userDiv">
                <Avatar sx={{ height: '7vh', width: '7vh' }} />
                <p className="name">보비</p>
              </div>
              <div className="userInfoDiv">
                <a href="/mypage">마이페이지</a>
                <a href="/logout">로그아웃</a>
                <div className="right" role="button" onClick={() => navigate(-1)} onKeyDown={console.log('back!')} tabIndex={0}>
                  <img className="paw" src={Paw} alt="paw" />
                  <div className="goback">뒤로가기</div>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </StyledHeader>
  );
}

export default Header;
