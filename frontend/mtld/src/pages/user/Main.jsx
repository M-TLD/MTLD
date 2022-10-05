import React, { useEffect, useState } from 'react';
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
import bobi from 'assets/bobi.png';
import { fetchPuppyInfo, puppySelector, fetchAlarmInfo, alarmSelector } from 'app/puppy';
import { useSelector, useDispatch } from 'react-redux';
import { isFulfilled } from '@reduxjs/toolkit';
import vaccine from 'app/vaccine';

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
  const alarm = useSelector(alarmSelector);
  const dispatch = useDispatch();

  const [vaccineAlarm, setVaccineAlarm] = useState({});
  const [vaccineDday, setVaccineDday] = useState('');
  const [vaccineName, setVaccineName] = useState('');
  const [medicineDday, setMedicineDday] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [medicineAlarm, setMedicineAlarm] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    dispatch(fetchPuppyInfo());
  }, []);

  useEffect(() => {
    const triggerAlarm = async () => {
      const action = await dispatch(fetchAlarmInfo());
      if (isFulfilled(action)) {
        // console.log(action.payload.data); // [{...}]
        return action.payload.data;
      }
    };
    triggerAlarm().then((res) => {
      for (let i = 0; i < res[0].vaccinations.length; i += 1) {
        const vaccineAlarmValue = res[0].vaccinations.slice();
        const medicineAlarmValue = res[0].takingMedicines.slice();
        const vaccineResult = vaccineAlarmValue.sort((a, b) => (a.expectDate > b.expectDate ? 1 : -1));
        const medicineResult = medicineAlarmValue.sort((a, b) => (a.expectDate > b.expectDate ? 1 : -1));
        console.log(vaccineResult);
        setVaccineAlarm({ date: vaccineResult[0].expectDate, vaccineId: vaccineResult[0].vaccineId });
        setMedicineAlarm({ date: medicineResult[0].expectDate, medicineId: medicineResult[0].medicineId });
    }
});
  }, []);

  useEffect(() => {
    medDdayCounter();
    medicineKind();
    vaccDdayCounter();
    vaccineKind();
  }, [vaccineAlarm, medicineAlarm]);

  const vaccDdayCounter = () => {
    console.log('dday');
    const dday = new Date(vaccineAlarm.date);
    const today = new Date(); // 오늘 날짜 객체 생성
    const yy = today.getFullYear();
    const mm = dday.getMonth();
    const dd = dday.getDate();

    const dDay = new Date(yy, mm, dd);
    const diffDate = Math.ceil((dDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    setVaccineDday(diffDate);
  };

  const medDdayCounter = () => {
    console.log('dday');
    const dday = new Date(vaccineAlarm.date);
    const today = new Date(); // 오늘 날짜 객체 생성
    const yy = today.getFullYear();
    const mm = dday.getMonth();
    const dd = dday.getDate();

    const dDay = new Date(yy, mm, dd);
    const diffDate = Math.ceil((dDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    setMedicineDday(diffDate);
  };

  const vaccineKind = () => {
    if (vaccineAlarm.vaccineId === 1) {
      setVaccineName('DHPPL');
    } else if (vaccineAlarm.vaccineId === 2) {
      setVaccineName('코로나');
    } else if (vaccineAlarm.vaccineId === 3) {
      setVaccineName('켄넬코프');
    } else if (vaccineAlarm.vaccineId === 4) {
      setVaccineName('광견병');
    }
  };

  const medicineKind = () => {
    if (medicineAlarm.medicineId === 1) {
      setMedicineName('심장사상충약');
    } else if (vaccineAlarm.vaccineId === 2) {
      setMedicineName('진드기약');
    } else if (vaccineAlarm.vaccineId === 3) {
      setMedicineName('구충제');
    }
  };

  if (!puppy.puppyInfo && isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {Array.isArray(puppy.puppyInfo) && puppy.puppyInfo.length < 1 ? (
        <StyledSwiper
          modules={[Navigation]}
          // spaceBetween={}
          slidesPerView={1} // 한 슬라이드에 보여줄 갯수
          navigation
        >
          <StyledSwiperSlide>
            <StyledLink to="/mypage">
              <OurBabyDiv>
                <OurBaby src={bobi} />
              </OurBabyDiv>
            </StyledLink>
            <Welcome>
              <BabyName>&nbsp;친구를</BabyName>
              <span>&nbsp;등록해줘!</span>
            </Welcome>
            <Alarm>
              <span>멍더랜드에 온 걸 환영하개</span>
              <span>보비 사진을 눌러 친구를 등록해조</span>
            </Alarm>
          </StyledSwiperSlide>
        </StyledSwiper>
      ) : (
        <StyledSwiper
          modules={[Navigation]}
          slidesPerView={1} // 한 슬라이드에 보여줄 갯수
          navigation
        >
          {puppy.puppyInfo.map((pup, i) => (
            <StyledSwiperSlide key={i}>
              <StyledLink to="/mypage">
                <OurBabyDiv>
                  <OurBaby src={pup.fileURL} />
                </OurBabyDiv>
              </StyledLink>
              <Welcome>
                <BabyName>&nbsp;{pup.name}</BabyName>
                <span>&nbsp;반가워!</span>
              </Welcome>
              <StyledLink to={`/pet-medical-card/${pup.id}`}>
                <Alarm>
                  <span>{vaccineName} 접종까지 {vaccineDday}일 남았어요!</span>
                  <span>{medicineName} {medicineDday}일까지 잊지 말아주세요!</span>
                </Alarm>
              </StyledLink>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
      )}

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

export default Main;
