import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Paw from 'assets/paw_blue.png';
import axios from 'axios';

import { useSelector } from 'react-redux';

const StyledCreate = styled.div`
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

  #check {
    position: absolute;
    right: 5px;
  }
`;

const PawImage = styled.img`
  width: 30px;
  height: 30px;
`;

function DiaryCreate() {
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
  const fileInput = useRef(null);

  const formData = new FormData();

  const onLoadFile = (event) => {
    if (event.target.files[0]) {
      setImage([event.target.files[0]]);
      // formData.append('image', [event.target.files[0]]);
      // console.log('image:', formData.get('image'));
    }

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const onTextChange = (e) => {
    setTextValue(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const recordAppend = async () => {
    const record = { diaryDate: date, mainText: textValue };
    // console.log(record);
    const re = JSON.stringify(record);

    formData.append('image', Image);
    formData.append(
      'record',
      new Blob([re], {
        type: 'application/json',
      }),
    );

    console.log('image:', formData.get('image'));
    console.log('record:', formData.get('record'));

    // for (const key of formData.keys()) {
    //   console.log(`${key}: ${formData.get(key)}`);
    // }
    // for (const [name, value] of formData) {
    //   alert(`${name} = ${value}`);
    // }
    const res = await axios.post('http://localhost:8080/api/diary/record', formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        ContentType: 'multipart/form-data',
      },
    });
    console.log(res);

    // console.log(formData.get('record').name.diaryDate);
  };

  const newButton = () => {
    console.log(JSON.stringify(formData.get('record')));
  };

  // console.log(formData.get('image'));
  // console.log(JSON.stringify(formData));
  // console.log(JSON.stringify(formData.get('record')));
  // console.log(formData.get('record'));
  // console.log(formData.get('record').name);)

  // for (let key of formData.keys()) {
  //   console.log(`${key}: ${formData.get(key)}`);
  // }

  // for (let key of formData.keys()) {
  //   console.log(key);
  // }
  // for (var value of profileData.values()) {
  //   console.log(value);
  // }
  return (
    <StyledCreate>
      <div className="top">
        <CloseRoundedIcon id="close" sx={{ color: '#F38181' }} onClick={newButton} />
        <ImageOutlinedIcon
          id="photo"
          sx={{ color: '#F4C7AB' }}
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <img width="20px" src={Image} alt="" />
        <input ref={fileInput} className="upload-btn" type="file" name="profile-image" id="profile" accept="image/*" onChange={onLoadFile} />
        <CheckRoundedIcon id="check" sx={{ color: '#81E3D7' }} onClick={recordAppend} />
      </div>
      <br />
      <div>
        {/* 해당 날짜에 산책 기록이 있으면 발자국 표시 */}
        <PawImage src={Paw} />
      </div>
      <div>
        <p>{newDate}</p>
      </div>
      <input type="text" onChange={onTextChange} />
    </StyledCreate>
  );
}

export default DiaryCreate;
