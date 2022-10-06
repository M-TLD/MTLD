import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PuppyDxImage from 'assets/puppy_diagnosis.png';
import Paw from 'assets/paw.png';
import YellowPaw from 'assets/paw_yellow.png';
import BluePaw from 'assets/paw_blue.png';
import Search from 'assets/search.png';
import DxModal from 'components/common/DxModal';

const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 1vh;
  color: #5c5c5c;

  .title {
    text-align: left;
    margin: 1vh;
    padding-left: 1vh;
    font-size: 18px;
  }

  .result {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: center;
    padding-left: 2vh;
    padding-right: 2vh;
    margin-bottom: 1vh;
  }

  .result-title {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .searchicon {
    padding-left: 0.5vh;
  }

  .searchicon:hover {
    cursor: pointer;
  }

  .engtitle {
    width: 100%;
    font-size: 11px;
    color: #bdbdbd;
  }

  .define {
    width: 100%;
    font-size: 11px;
  }

  .hr {
    margin-left: 2vh;
    margin-right: 2vh;
  }

  .hr1 {
    border: 0;
    height: 2px;
    background: #ccc;
  }

  .bold {
    font-weight: bold;
  }

  .modal {
    text-align: right;
    width: 100%;
  }

  .recommend {
    margin-left: 2vh;
    text-align: left;
    font-size: 14px;
  }

  .r-text {
    word-break: keep-all;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  opacity: 0.8;
  filter: brightness(120%);
`;

function SurveyResult() {
  const report = useSelector((state) => state.diagnosis.value);

  const recommend = [
    '구충제 섭취로 주기적으로 기생충을 예방해 주세요.',
    '꾸준하게 유산균을 챙겨주세요.',
    '알레르기를 유발하는 사료는 절대 금지!',
    '예방접종이 필요한 시기와 종류를 꼭 확인해주세요!',
    '반려견이 아프진 않은지 늘 세심하게 살펴주세요.',
    '반려견이 조용히 잠을 자고 휴식할 시간을 충분히 주세요.',
    '함께 많은 시간을 보내고 교감하며 놀아 주세요',
    '반려견의 특성과 체질에 따른 주거 환경을 제공해주세요.',
  ];

  const nums = [];
  for (let i = 0; i < 3; i += 1) {
    const randomNum = Math.floor(Math.random() * 8);
    if (nums.indexOf(randomNum) === -1) {
      nums.push(randomNum);
    } else {
      i -= 1;
    }
  }

  const paws = [YellowPaw, BluePaw, Paw];

  return (
    <StyledResult>
      <BannerImage src={PuppyDxImage} alt="banner" />

      <div className="title">
        <span className="bold" style={{ color: '#949BEC' }}>
          멍
        </span>
        <span className="bold" style={{ color: '#5c5c5c' }}>
          !
        </span>
        <span className="bold" style={{ color: '#FFC5C5' }}>
          더
        </span>
        <span className="bold" style={{ color: '#FFD439' }}>
          랜
        </span>
        <span className="bold" style={{ color: '#FE8F8F' }}>
          드
        </span>
        <span>가 생각하는 의심 질병</span>
      </div>

      {report.map((r, idx) => (
        <div className="result" key={idx}>
          <div align="left" className="result-title">
            <span className="disease-name">{r.disease_name.split('(')[0]}</span>
            <img
              role="presentation"
              onKeyDown={console.log()}
              src={Search}
              alt="search-icon"
              height="17px"
              className="searchicon"
              onClick={() => window.open(`https://www.google.com/search?q=${r.disease_name.split('(')[0]}`, '_blank')}
            />
          </div>

          <div className="engtitle">{r.disease_name.split('(')[1].slice(0, -1)}</div>
          <div className="modal">
            <DxModal
              title={r.disease_name.split('(')[0]}
              engtitle={r.disease_name.split('(')[1].slice(0, -1)}
              content={r.define}
              imagelink={r.image_url}
            />
          </div>
        </div>
      ))}
      <div className="hr">
        <br />
        <hr className="hr1" />
      </div>

      <div className="title">
        <span className="bold">멍더랜드</span>
        <span>가 추천해요!</span>
      </div>

      <div className="recommend">
        {nums.map((num, idx) => (
          <div key={idx}>
            <span>
              <img src={paws[idx]} alt="paw" height="13px" />
            </span>
            <span className="r-text">{recommend[num]}</span>
          </div>
        ))}
      </div>
    </StyledResult>
  );
}

export default SurveyResult;
