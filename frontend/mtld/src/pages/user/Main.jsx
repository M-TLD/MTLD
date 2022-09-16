import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Bobi from 'assets/bobi.png';
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
  margin-top: 30px;
  // gap: 50px;
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
  margin-bottom: 20px;
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

const StyledSwiper = styled(Swiper)`
  margin: 15px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OurBabyDiv = styled.div`
  width: 150px;
  height: 150px; 
  border-radius: 70%;
  border: 10px solid #FFEEB1;
  overflow: hidden;
  margin-bottom: 20px;
`;

const OurBaby = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Welcome = styled.div`
  display: flex;
  color: #5C5C5C;
  font-size: 28px;
  margin-bottom: 12px;
`;

const BabyName = styled.span`
    color: #81E3D7;
    font-weight: 600;
`;
const Alarm = styled.div`
  width: 330px;
  height: 90px;
  background-color: #EAFED1;
  border-radius: 15px;
  // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5C5C5C;
  font-size: 18px;
  // line-height : 50px;
`;
function Main() {
  return (
    <div>
      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1} // 한 슬라이드에 보여줄 갯수
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <StyledSwiperSlide>
          <OurBabyDiv>
            <OurBaby src={Bobi} />
          </OurBabyDiv>
          <Welcome>
            <BabyName>&nbsp;보비야</BabyName>
            <span>&nbsp;반가워!</span>
          </Welcome>
          <Alarm>
            <span>예방접종까지 10일 남았어요!</span>
            <span>심장사상충약 잊지 말아주세요!</span>
          </Alarm>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <OurBabyDiv>
            <OurBaby src={Bobi} />
          </OurBabyDiv>
          <Welcome>
            <BabyName>&nbsp;바비야</BabyName>
            <span>&nbsp;반가워!</span>
          </Welcome>
          <Alarm>
            <span>예방접종까지 10일 남았어요!</span>
            <span>심장사상충약 잊지 말아주세요!</span>
          </Alarm>
        </StyledSwiperSlide>
        <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
      </StyledSwiper>
      <Container>
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
    </div>

  );
}

export default Main;
