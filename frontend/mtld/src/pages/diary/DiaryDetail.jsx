import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Paw from 'assets/paw_blue.png';
import axios from 'axios';
import DeleteModal from 'components/common/DeleteModal';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import ImageCarousel from 'components/walklog/ImageCarousel';

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    display: relative;
    margin-top: 2vh;
  }

  #close {
    position: absolute;
    left: 2%;
  }

  #delete {
    position: absolute;
    right: 35px;
  }

  #check {
    position: absolute;
    right: 10px;
  }

  .date {
    margin-top: 0;
    font-size: 15px;
  }

  .mainText {
    margin-right: 3vh;
    margin-left: 3vh;
  }
`;

const PawImage = styled.img`
  width: 50px;
  height: 50px;
`;

function DiaryDetail() {
  const navigate = useNavigate();
  const date = useSelector((state) => state.date.value);

  const [diaryData, setDiaryData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const images = [];

  // 해당하는 날짜의 다이어리 데이터
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/diary/record/date/${date}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setDiaryData(data);
        setImageData(data.images);
      });
  }, []);

  // imageCarousel 컴포넌트에 보낼 이미지 리스트 생성
  for (let i = 0; i < imageData.length; i += 1) {
    images.push(imageData[i].url);
  }

  // 날짜 데이터 출력 형식 가공
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);

  const newDate = `${year}년 ${month}월 ${day}일`;

  // 다이어리 삭제 (모달창에서 '예' 버튼 클릭 시 작동)
  const deleteButton = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/diary/record/${diaryData.id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });
    console.log(res);
    if (res.status === 200) {
      navigate('/diary-home');
    }
    console.log('delete!');
  };

  return (
    <StyledDetail>
      <div className="top">
        <NavLink to="/diary-home">
          <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} />
        </NavLink>
        <DeleteModal submit={deleteButton} />
        <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} />
      </div>
      <br />
      <div>
        {/* 해당 날짜에 산책 기록이 있으면 발자국 표시 */}
        <PawImage src={Paw} />
        <p className="date">{newDate}</p>
      </div>
      {images.length > 0 ? <ImageCarousel ImageList={images} /> : ''}

      <p className="mainText">{diaryData.mainText}</p>
    </StyledDetail>
  );
}

export default DiaryDetail;
