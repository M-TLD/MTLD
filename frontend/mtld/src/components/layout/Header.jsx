import React from 'react';
import styled from 'styled-components';
import Logo from 'assets/mung.png';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  .Header {
    position: fixed;
    top: 0;
    left: 0;
    height: 8vh;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ffeeb1;
  }

  .Contents {
    display: flex;
    align-items: center;
    margin-left: 3vh;
  }
`;

const LogoImage = styled.img`
  height: 4vh;
`;
function Header() {
  return (
    <StyledHeader>
      <div className="Header">
        <div className="Contents">
          <Link className="Link" to="/">
            <LogoImage src={Logo} />
          </Link>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;
