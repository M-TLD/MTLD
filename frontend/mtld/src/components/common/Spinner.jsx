import React from 'react';
import styled from 'styled-components';
import mtldLogo from 'assets/logo.png';
import pawYellow from 'assets/paw_yellow.png';

const StyledSpinner = styled.div`
  margin-top: 5vh;
  font-family: 'UhBeeStrawberry';
  font-weight: bold;

  .line1 {
    margin-bottom: 1;
  }

  .line2 {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logoimg {
    width: 6vw;
  }
`;

const Logo = styled.img`
  width: 40vw;
  margint-top: 20vh;
  margin-bottom: 3vh;
`;
function Spinner(props) {
  return (
    <StyledSpinner>
      <Logo src={mtldLogo} />
      <p className="line1">친구들의 정보를 가져오고 있으니</p>
      <div className="line2">
        <span>조금만 기다리개!</span>
        <img src={pawYellow} alt="logo" className="logoimg" />
      </div>
    </StyledSpinner>
  );
}
export default Spinner;
