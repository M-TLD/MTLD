import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { deletePuppyInfo, puppySelector } from 'app/puppy';
import { useDispatch, useSelector } from 'react-redux';

const StyledModal = Modal.styled`
  width: 300px;
  height: 200px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 5px solid #FFEEB1;
  opacity: ${(props) => props.opacity};
  transition : all 0.05s ease-in-out;;
  `;

// const Atag = styled.a`
//   display: block;
//   color: black;
//   text-align: center;
//   padding: 0.875rem 1rem;
//   text-decoration: none;
//   &:hover,
//   &:active {
//     cursor: pointer;
//   }
// `;

// const Delete = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 1vh;
//   gap: 1vw;
// `;

const DeleteBtn = styled.button`
  border-radius: 5px;
  height: 1.5rem;
  border: none;
  background-color: #ffeeb1;
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
  margin-top: 20px;
`;

const Content = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin: 5px 0px 15px 0px;
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const Btn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  margin-top: 5px;
  color: #5c5c5c;
  font-size: 14px;
  font-weight: 600;
  font-family: 'GmarketSansMedium';
`;

function FancyModalButton(props) {
  const dispatch = useDispatch();
  const puppy = useSelector(puppySelector);
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
  const deleteButton = async (puppyId) => {
    const action = await dispatch(deletePuppyInfo(puppyId));
  };

  if (props) {
    return (
      <div className="NoticeModal">
        <ModalProvider backgroundComponent={FadingBackground}>
          <div>
            <DeleteBtn type="button" onClick={toggleModal} style={{ color: '#F38181' }}>
              삭제하기
            </DeleteBtn>
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
                <Title>삭제하시겠습니까?</Title>
                <Content>관련 정보가 모두 삭제됩니다.</Content>
                <BtnDiv>
                  <Btn
                    backgroundColor="#FFEEB1"
                    onClick={() => {
                      console.log(props);
                      deleteButton(puppy.puppyInfo[props.props.puppyId].id);
                    }}
                  >
                    예
                  </Btn>
                  <Btn backgroundColor="#EEEEEE">아니오</Btn>
                </BtnDiv>
              </DeleteDiv>
            </StyledModal>
          </div>
        </ModalProvider>
      </div>
    );
  }
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function YNModal(props) {
  return (
    <div className="YNModal">
      <ModalProvider backgroundComponent={FadingBackground}>
        <FancyModalButton props={props} />
      </ModalProvider>
    </div>
  );
}

export default YNModal;
