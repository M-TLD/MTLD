import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Paw from 'assets/paw.png';

const StyledFooter = styled.footer`
  .Footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 8vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffeeb1;
    z-index: 100;
  }

  .Contents {
    display: flex;
    width: 100%;
    margin-left: 10px;
    gap: 28%;
    align-items: center;
  }

  .material-icons {
    color: #dfba88;
    font-size: 5vh;
  }

  .Link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    text-decoration: none;
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
    margin-left: 0.5vh;
  }

  .paw {
    height: 30px;
  }
`;

const PawImage = styled.img`
  height: 6.5vh;
`;

function Footer() {
  const navigate = useNavigate();
  return (
    <StyledFooter>
      <div className="Footer">
        <div className="Contents">
          <div className="right" role="button" onClick={() => navigate(-1)} onKeyDown={console.log('back!')} tabIndex={0}>
            {/* <img className="paw" src={Paw} alt="paw" /> */}
            <div className="goback">뒤로가기</div>
          </div>
          <Link className="Link" to="/">
            <PawImage src={Paw} />
          </Link>
        </div>
      </div>
    </StyledFooter>
  );
}

export default Footer;
