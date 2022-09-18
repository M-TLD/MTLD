import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
`;

const PawImage = styled.img`
  height: 6.5vh;
`;

function Footer() {
  return (
    <StyledFooter>
      <div className="Footer">
        <div className="Contents">
          <Link className="Link" to="/">
            <PawImage src={Paw} />
          </Link>
        </div>
      </div>
    </StyledFooter>
  );
}

export default Footer;
