import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import MedicalCheckup from 'assets/survey_question.png';
import WalkingDiary from 'assets/diary_home.png';
import PetFriendly from 'assets/location_main.png';
import HoneyTip from 'assets/info_board.png';
import AdoptionHelper from 'assets/adoption_survey.png';
import AbandonedDogs from 'assets/adoption_home.png';
import Arrow from 'assets/arrow.png';
import Spinner from 'components/common/Spinner';
import { fetchPuppyInfo, puppySelector } from 'app/puppy';
import { useSelector, useDispatch } from 'react-redux';

const StyledSwiper = styled(Swiper)`
  margin-top: 30px;
  position: relative;
  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    width: 90px;
    height: 100px;
    background: url(${Arrow}) no-repeat !important;
    position: absolute;
    right: 0;
    top: 100px;
  }
  .swiper-button-next::after {
    display: none;
  }
  @media screen and (min-width: 1356px) {
    margin-top: 60px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`;

const OurBabyDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  border: 10px solid #ffeeb1;
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
  color: #5c5c5c;
  font-size: 28px;
  margin-bottom: 12px;
`;

const BabyName = styled.span`
  color: #81e3d7;
  font-weight: 600;
`;

const Alarm = styled.div`
  width: 330px;
  height: 90px;
  background-color: #eafed1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  @media screen and (min-width: 1356px) {
    margin-top: 60px;
  }
`;

const MenuGroup = styled.div`
  display: flex;
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
  @media screen and (min-width: 1356px) {
    width: 80px;
  }
`;

const MenuImage = styled.img`
  height: 8vh;
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
    font-size: 13px;
  }
`;

function Main() {
  const puppy = useSelector(puppySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPuppyInfo());
  }, []);

  if (!puppy.puppyInfo) {
    return <Spinner />;
  }

  if (puppy.puppyInfo.length === 1) {
    return (
      <div>
        <StyledSwiper
          modules={[Navigation]}
          // spaceBetween={}
          slidesPerView={1} // 한 슬라이드에 보여줄 갯수
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          navigation
        >
          <StyledSwiperSlide>
            <StyledLink to="/mypage">
              <OurBabyDiv>
                <OurBaby src={puppy.puppyInfo[0].fileURL} />
              </OurBabyDiv>
            </StyledLink>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[0].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <span>예방접종까지 10일 남았어요!</span>
                <span>심장사상충약 잊지 말아주세요!</span>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
        </StyledSwiper>
        <MenuDiv>
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
        </MenuDiv>
      </div>
    );
  }
  if (puppy.puppyInfo.length === 2) {
    return (
      <div>
        <StyledSwiper
          modules={[Navigation]}
          // spaceBetween={}
          slidesPerView={1} // 한 슬라이드에 보여줄 갯수
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          navigation
        >
          <StyledSwiperSlide>
            <StyledLink to="/mypage">
              <OurBabyDiv>
                <OurBaby src={puppy.puppyInfo[0].fileURL} />
              </OurBabyDiv>
            </StyledLink>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[0].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <span>예방접종까지 10일 남았어요!</span>
                <span>심장사상충약 잊지 말아주세요!</span>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <OurBabyDiv>
              <OurBaby src={puppy.puppyInfo[1].fileURL} />
            </OurBabyDiv>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[1].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <div>
                  <span>예방접종까지 10일 남았어요!</span>
                  <span>심장사상충약 잊지 말아주세요!</span>
                </div>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
        </StyledSwiper>
        <MenuDiv>
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
        </MenuDiv>
      </div>
    );
  }
  if (puppy.puppyInfo.length === 3) {
    return (
      <div>
        <StyledSwiper
          modules={[Navigation]}
          // spaceBetween={}
          slidesPerView={1} // 한 슬라이드에 보여줄 갯수
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          navigation
        >
          <StyledSwiperSlide>
            <StyledLink to="/mypage">
              <OurBabyDiv>
                <OurBaby src={puppy.puppyInfo[0].fileURL} />
              </OurBabyDiv>
            </StyledLink>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[0].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <span>예방접종까지 10일 남았어요!</span>
                <span>심장사상충약 잊지 말아주세요!</span>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <OurBabyDiv>
              <OurBaby src={puppy.puppyInfo[1].fileURL} />
            </OurBabyDiv>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[1].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <div>
                  <span>예방접종까지 10일 남았어요!</span>
                  <span>심장사상충약 잊지 말아주세요!</span>
                </div>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <OurBabyDiv>
              <OurBaby src={puppy.puppyInfo[2].fileURL} />
            </OurBabyDiv>
            <Welcome>
              <BabyName>&nbsp;{puppy.puppyInfo[2].name}</BabyName>
              <span>&nbsp;반가워!</span>
            </Welcome>
            <StyledLink to="/pet-medical-card">
              <Alarm>
                <div>
                  <span>예방접종까지 10일 남았어요!</span>
                  <span>심장사상충약 잊지 말아주세요!</span>
                </div>
              </Alarm>
            </StyledLink>
          </StyledSwiperSlide>
        </StyledSwiper>
        <MenuDiv>
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
        </MenuDiv>
      </div>
    );
  }
}

export default Main;
