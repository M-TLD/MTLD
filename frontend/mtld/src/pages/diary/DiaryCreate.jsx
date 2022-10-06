import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Paw from 'assets/paw_blue.png';
import ImagePreview from 'assets/ImagePreview.png';
import axios from 'axios';
import ImageCarousel from 'components/walklog/ImageCarousel';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledCreate = styled.div`
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

  #photo {
    position: absolute;
    right: 30px;
  }

  #photo:hover {
    cursor: pointer;
  }

  #check {
    position: absolute;
    right: 5px;
  }

  #check:hover {
    cursor: pointer;
  }

  .upload-btn {
    display: none;
  }

  .imagedelete {
    margin-left: 160px;
    margin-bottom: 1vh;
    font-family: 'GmarketSansMedium';
    font-size: 12px;
    color: #5c5c5c;
  }

  .imagepreview:hover {
    cursor: pointer;
  }

  .imagedelete:hover {
    cursor: pointer;
  }

  .inputbox {
    height: 200px;
    width: 250px;
    border: none;
    font-family: 'GmarketSansMedium';
  }

  .walkingpaw {
    display: flex;
    align-items: center;
    font-family: UhBeeStrawberry;
    font-weight: bold;
  }
`;

const PawImage = styled.img`
  width: 30px;
  height: 30px;
`;

function DiaryCreate() {
  const navigate = useNavigate();
  // date: yyyy-mm-dd 형식
  const date = useSelector((state) => state.date.value);

  // 출력 위해 yyyy년 mm월 dd일 형태로 파싱
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const newDate = `${year}년 ${month}월 ${day}일`;

  // 이미지, 날짜, 텍스트값 POST

  const [textValue, setTextValue] = useState('');

  const [Image, setImage] = useState([]);
  const PreviewImage = [ImagePreview];
  const [showImages, setShowImages] = useState([]);
  const fileInput = useRef(null);
  // const ImageList = new Array();

  const formData = new FormData();

  const onLoadFile = (event) => {
    // 이미지 미리보기
    const imageLists = event.target.files;
    // console.log('targetlist:', imageLists);
    let imageUrlLists = [...showImages];
    let imageUploadLists = [...Image];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    for (let i = 0; i < imageLists.length; i += 1) {
      imageUploadLists.push(imageLists[i]);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    if (imageUploadLists.length > 5) {
      imageUploadLists = imageUploadLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
    setImage(imageUploadLists);
  };
  // console.log('showImages', showImages);
  // console.log('imagelist:', Image);

  const ResetImage = (e) => {
    setShowImages([]);
    setImage([]);
    // console.log(showImages);
  };

  const onTextChange = (e) => {
    setTextValue(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const recordAppend = async () => {
    const record = { diaryDate: date, mainText: textValue };
    // console.log(record);
    const re = JSON.stringify(record);

    for (let i = 0; i < Image.length; i += 1) {
      formData.append('image', Image[i]);
    }

    // formData.append('image', Image);
    formData.append(
      'record',
      new Blob([re], {
        type: 'application/json',
      }),
    );

    // console.log('image:', formData.get('image'));
    // console.log('record:', formData.get('record'));

    // for (const value of formData.values()) {
    //   console.log('value', value);
    // }

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/diary/record`, formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(res);
    if (res.status === 201) {
      navigate('/diary-home');
    }
  };

  const [walkingData, setWalkingData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/diary`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.walkingDateList !== undefined) {
          setWalkingData(data.walkingDateList);
        }
      });
  }, []);
  // console.log(walkingData);

  return (
    <StyledCreate>
      <div className="top">
        <NavLink to="/diary-home">
          <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} />
        </NavLink>
        <ImageOutlinedIcon
          id="photo"
          sx={{ color: '#F4C7AB' }}
          onClick={() => {
            fileInput.current.click();
          }}
        />

        <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} onClick={recordAppend} />
      </div>
      <br />
      <div>
        {walkingData.includes(date) ? (
          <div className="walkingpaw">
            <PawImage src={Paw} /> <span>산책을 완료한 날이에요!</span>
          </div>
        ) : (
          <p>산책을 하지 않은 날이에요! 😥</p>
        )}
        <br />
      </div>
      <div>
        <p>{newDate}</p>
      </div>
      <input
        ref={fileInput}
        className="upload-btn"
        type="file"
        name="profile-image"
        id="profile"
        accept="image/*"
        multiple="multiple"
        onChange={onLoadFile}
      />
      <div className="imagedelete" role="button" onClick={ResetImage} onKeyDown={console.log()} tabIndex={0}>
        이미지 다시 고르기
      </div>
      <div
        role="button"
        onKeyDown={console.log()}
        tabIndex={0}
        onClick={() => {
          fileInput.current.click();
        }}
        className="imagepreview"
      >
        {showImages.length >= 1 ? <ImageCarousel ImageList={showImages.reverse()} /> : <ImageCarousel ImageList={PreviewImage} />}
      </div>

      <hr />
      <textarea className="inputbox" type="text" onChange={onTextChange} placeholder="오늘의 일기를 적어보세요!" />
    </StyledCreate>
  );
}

export default DiaryCreate;
