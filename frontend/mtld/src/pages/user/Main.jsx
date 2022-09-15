import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MedicalCheckup from 'assets/survey_question.png';
import WalkingDiary from 'assets/diary_home.png';
import PetFriendly from 'assets/location_main.png';
import HoneyTip from 'assets/info_board.png';
import AdoptionHelper from 'assets/adoption_survey.png';
import AbandonedDogs from 'assets/adoption_home.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Test = styled.div`
  background-color: red;  
  width: 300px;
  height: 250px;
`;

const MenuGroup = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 1356px) {
    flex-wrap: nowrap;
    gap: 60px;
  }
`;

const MenuItem = styled.div`
  width: 30%;
  margin-bottom: 30px;
`;

const MenuImage = styled.img`
  height: 8vh;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    color: #5C5C5C;
    font-size: 13px;
    }
`;

function Main() {
  return (
    <Container>
      <Test>
        여기에 강아지 사진이랑 프로필
      </Test>
      <MenuGroup>
        <MenuItem>
          <StyledLink to="/survey-question">
            <div>
              <MenuImage src={MedicalCheckup} />
            </div>
            건강진단
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/diary-home">
            <div>
              <MenuImage src={WalkingDiary} />
            </div>
            산책일지
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/location-main">
            <div>
              <MenuImage src={PetFriendly} />
            </div>
            애견동반장소
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/info-board">
            <div>
              <MenuImage src={HoneyTip} />
            </div>
            꿀팁게시판
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/adoption-survey">
            <div>
              <MenuImage src={AdoptionHelper} />
            </div>
            입양도우미
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/adoption-home">
            <div>
              <MenuImage src={AbandonedDogs} />
            </div>
            유기견친구들
          </StyledLink>
        </MenuItem>
      </MenuGroup>
    </Container>
  );
}

export default Main;
