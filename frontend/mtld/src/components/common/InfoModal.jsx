import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledModal = Modal.styled`
  width: 300px;
  height: 550px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 5px solid #FFEEB1;
  opacity: ${(props) => props.opacity};
  transition : all 0.05s ease-in-out;;
  `;

const Atag = styled.a`
  display: block;
  color: #5c5c5c;
  text-align: start;
  font-size: 0.8em;
  // padding: 0.875rem 1rem;
  text-decoration: underline;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  margin: 5px 5px 0px 270px;
  color: #f38181;
`;

const VaccinationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #5c5c5c;
  font-size: 10px;
`;

const InfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0 20px 0;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const ContentDiv = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
`;

const BtnDiv = styled.div`
  margin-top: 5px;
`;

const HospitalBtn = styled.button`
  width: 230px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #ffeeb1;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  margin-top: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #5c5c5c;
    font-size: 14px;
    font-weight: 600;
    font-family: 'GmarketSansMedium';
  }
`;

function FancyModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <div>
      <Atag onClick={toggleModal}>권장 예방접종 시기 알아보기</Atag>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <StyledCloseRoundedIcon onClick={toggleModal} fontSize="medium" />

        <VaccinationInfo>
          <InfoTitle>예방접종 정보</InfoTitle>
          <Title>혼합예방주사 (DHPPL)</Title>
          <ContentDiv>
            <span>
              기초접종: 생후 6~8주에 1차 접종
              <br />
              추가접종: 1차 접종 후 2~4주 간격으로 2~4회
              <br />
              보강접종: 추가접종 후 매년 1회 주사
            </span>
          </ContentDiv>
          <Title>코로나바이러스성 장염(Coronavirus)</Title>
          <ContentDiv>
            <span>
              기초접종: 생후 6~8주에 1차 접종
              <br />
              추가접종: 1차 접종 후 2~4주 간격으로 1~2회
              <br />
              보강접종: 추가접종 후 매년 1회 주사
            </span>
          </ContentDiv>
          <Title>기관ㆍ기관지염 (Kennel Cough)</Title>
          <ContentDiv>
            <span>
              기초접종: 생후 6~8주에 1차 접종
              <br />
              추가접종: 1차 접종 후 2~4주 간격으로 1~2회
              <br />
              보강접종: 추가접종 후 매년 1회 주사
            </span>
          </ContentDiv>
          <Title>광견병</Title>
          <ContentDiv>
            <span>
              기초접종 : 생후 3개월 이상 1회 접종
              <br />
              보강접종 : 6개월 간격으로 주사
            </span>
          </ContentDiv>
          <BtnDiv>
            <span>출처: 농림축산검역본부 동물보호관리시스템</span>
            <HospitalBtn>
              <StyledLink to="/hospital">가까운 동물병원 찾기</StyledLink>
            </HospitalBtn>
          </BtnDiv>
        </VaccinationInfo>
      </StyledModal>
    </div>
  );
}
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function InfoModal() {
  return (
    <div className="InfoModal">
      <ModalProvider backgroundComponent={FadingBackground}>
        <FancyModalButton />
      </ModalProvider>
    </div>
  );
}

export default InfoModal;
