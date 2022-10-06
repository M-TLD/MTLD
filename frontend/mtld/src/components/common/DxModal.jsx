import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledModal = Modal.styled`
  width: 300px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 5px solid #FFEEB1;
  opacity: ${(props) => props.opacity};
  transition : all 0.05s ease-in-out;;

  .NoticeModal {
    width: 100%;
  }
  `;

const Atag = styled.a`
  display: block;
  color: black;
  padding: 0.875rem 1rem;
  text-decoration: none;
  font-size: 13px;
  &:hover,
  &:active {
    cursor: pointer;
  }

  .a-tag {
    color: #5c5c5c;
    padding: 0.5vh;
    border-radius: 5px;
    background-color: #fff6c4;
  }
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  margin: 5px 5px 0px 270px;
  color: #f38181;
`;

const DeleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #5c5c5c;
  font-size: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
`;

const TitleEng = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #bdbdbd;
  margin: 5px 5px 15px 5px;
  text-align: center;
`;

const Content = styled.span`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  margin: 5px 10px 15px 10px;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function DxModal(props) {
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
    <div className="NoticeModal">
      <ModalProvider backgroundComponent={FadingBackground}>
        <Atag onClick={toggleModal} style={{ padding: 0 }}>
          <span className="a-tag">자세히 알아보기</span>
        </Atag>
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
          <DeleteDiv>
            <Title>{props.title}</Title>
            <TitleEng>{props.engtitle}</TitleEng>
            <Content>{props.content}</Content>
            <img src={props.imagelink} alt="" style={{ width: '250px', marginBottom: '1vh' }} />
          </DeleteDiv>
        </StyledModal>
      </ModalProvider>
    </div>
  );
}

export default DxModal;
