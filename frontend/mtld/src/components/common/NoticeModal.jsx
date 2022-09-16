import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const StyledModal = Modal.styled`
  width: 300px;
  height: 250px;
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
  color: black;
  text-align: center;
  padding: 0.875rem 1rem;
  text-decoration: none;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  margin: 5px 5px 0px 270px;  
  color: #F38181;
`;

const NoticeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;  
  color: #5C5C5C;
  font-size: 10px;
`;

const StyledNotificationsRoundedIcon = styled(NotificationsRoundedIcon)` 
  color: #81E3D7;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const ContentDiv = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const HospitalBtn = styled.button`
  width: 230px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #FFEEB1;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  margin-top: 5px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    color: #5C5C5C;
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
      <Atag onClick={toggleModal}>상세정보보기</Atag>
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
        <StyledNotificationsRoundedIcon fontSize="medium" />
        <NoticeInfo>
          <Title>오늘 보비 주사 맞는 날이예요!</Title>
          <ContentDiv>
            <span>
              혼합예방주사(DHPPL)
            </span>
            <br />
            <span>
              코로나바이러스성 장염
            </span>
            <br />
            <span>
              기관ㆍ기관지염
            </span>
            <br />
            <span>
              광견병
            </span>
          </ContentDiv>
          <HospitalBtn>
            <StyledLink to="/hospital">
              가까운 동물병원 찾기
            </StyledLink>
          </HospitalBtn>
        </NoticeInfo>
      </StyledModal>
    </div>
  );
}
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function NoticeModal() {
  return (
    <div className="NoticeModal">
      <ModalProvider backgroundComponent={FadingBackground}>
        <FancyModalButton />
      </ModalProvider>
    </div>
  );
}

export default NoticeModal;
