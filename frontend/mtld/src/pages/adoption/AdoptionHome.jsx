import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AbandonedItem from 'components/adoption/AbandonedItem';
import TopImage from 'assets/dogwithperson.png';

const StyledAdoptionHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .titletext {
    width: 180px;
    margin: 1vh;
    color: #5c5c5c;
    flex-wrap: nowrap;
    position: absolute;
    top: 25%;
    left: 49%;
    transform: translate(-50%);
  }

  .line {
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }

  .topimage {
    border: 6px solid #ad8158;
    width: 400px;
    height: 180px;
    opacity: 0.5;
  }

  #family {
    font-weight: bold;
  }
`;

const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1vh;
  @media screen and (min-width: 1356px) {
    flex-wrap: nowrap;
    gap: 30px;
  }
`;

function AdoptionHome() {
  // 전체 리스트 불러오기
  const [abandonedList, setAbandonedList] = useState([]);
  useEffect(() => {
    axios
      .get('https://mtld-2d290-default-rtdb.firebaseio.com/abandoned.json')
      .then((res) => res.data)
      .then((data) => {
        setAbandonedList(data);
      });
  }, []);
  // console.log(abandonedList);

  // 검색 기능
  const [sex, setSex] = useState();
  const [breed, setBreed] = useState();

  const sexChange = (event) => {
    const sexValue = event.target.value || undefined;
  };

  const breedChange = (event) => {
    const breedValue = event.target.value || undefined;
    setBreed(breedValue);
  };
  // console.log(input);

  const [filtered, setFiltered] = useState(abandonedList);

  useEffect(() => {
    if (
      // 입력값이 없으면 초기데이터 계속 출력
      breed === undefined
    ) {
      setFiltered(abandonedList);
    } else {
      const filteredList = abandonedList.reduce((acc, cur) => {
        const breedCondition = breed && breed.length > 0 ? cur.breed.includes(breed) : true;
        if (breedCondition) {
          acc.push(cur);
        }
        return acc;
      }, []);
      setFiltered(filteredList);
    }
  }, [breed]); // input이 변화될때만 재렌더링 (useEffect 미사용시 무한 렌더링 - 과부하 우려)

  console.log(breed);
  console.log(filtered);

  return (
    <StyledAdoptionHome>
      <img className="topimage" src={TopImage} alt="banner" />

      <div className="titletext">
        <p className="line">소중한 아이들의 </p>
        <span className="line" id="family">
          가족
        </span>
        <span>이 되어주세요!</span>
      </div>
      <div>
        <input type="text" placeholder="견종" onChange={breedChange} />
      </div>
      <div>
        <input type="text" placeholder="성별" onChange={sexChange} />
      </div>
      {filtered.length > 0 ? (
        <StyledItems>
          {filtered.map((f) => (
            <AbandonedItem key={f.id} item={f} />
          ))}
        </StyledItems>
      ) : (
        <StyledItems>
          {abandonedList.map((abandoned) => (
            <AbandonedItem key={abandoned.id} item={abandoned} />
          ))}
        </StyledItems>
      )}
    </StyledAdoptionHome>
  );
}

export default AdoptionHome;
