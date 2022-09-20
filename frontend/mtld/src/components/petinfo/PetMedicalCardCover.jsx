import React from 'react';
import styled from 'styled-components';
import cardlogo from 'assets/cardlogo.png';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const DogCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eafed1;
  margin-top: 2vh;
  width: 90vw;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 0.1px #5c5c5c;
`;

const CardDecoLine = styled.div`
  border: white solid 2px;
  width: 80vw;
  height: 75vh;
  border-radius: 8px;

  .cardText {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .cardP {
    margin: 0;
    padding: 0;
    color: #5c5c5c;
    font-size: 13px;
  }

  .cardH1 {
    margin: 0px;
    padding: 0;
  }
`;

const CardLogo = styled.img`
  margin-top: 30%;
  height: 10%;
`;

function PetMedicalCardCover() {
  return (
    <Wrap>
      <DogCard>
        <CardDecoLine>
          <CardLogo src={cardlogo} />
          <div className="cardText">
            <p className="cardP">건강한 강아지를 위한</p>
            <h1 className="cardH1">댕댕수첩</h1>
          </div>
        </CardDecoLine>
      </DogCard>
    </Wrap>
  );
}

export default PetMedicalCardCover;
