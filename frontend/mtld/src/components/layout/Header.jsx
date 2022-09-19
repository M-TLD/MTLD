import React from 'react';
import styled from 'styled-components';
import Logo from 'assets/mung.png';
import Paw from 'assets/paw_yellow.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  .Header {
    position: fixed;
    top: 0;
    left: 0;
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #ffeeb1;
    z-index: 100;
  }

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
    margin-right: 2vh;
    margin-left: 0.5vh;
  }

  .paw {
    cursor: pointer;
    width: 20px;
  }
`;

const LogoImage = styled.img`
  height: 4vh;
`;

function Header() {
  const navigate = useNavigate();
  const locationNow = useLocation();
  if (locationNow.pathname === '/login') return null;
  return (
    <StyledHeader>
      <div className="Header">
        <div className="Contents">
          <Link className="Link" to="/">
            <LogoImage src={Logo} />
          </Link>
          <div className="right" role="button" onClick={() => navigate(-1)} onKeyDown={console.log()} tabIndex={0}>
            <img className="paw" src={Paw} alt="paw" />
            <div className="goback">뒤로가기</div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;
