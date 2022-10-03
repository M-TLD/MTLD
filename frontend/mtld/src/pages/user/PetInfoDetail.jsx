import React, { useEffect } from 'react';
import styled from 'styled-components';
import bobi from 'assets/bobi.png';
import o from 'assets/o.png';
import x from 'assets/x.png';
import paws from 'assets/paws.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Dday from 'components/common/Dday';
import Spinner from 'components/common/Spinner';

import { fetchPupInfo, puppySelector } from 'app/puppy';

const Wrap = styled.div`
  margin: 0;
  padding: 0;

  .title {
    color: #5c5c5c;
    text-align: right;
    margin-right: 3vw;
    margin-bottom: 0;
  }

  h1 {
    margin-bottom: -5vh;
  }

  .puppyProfile {
    position: relative;
    display: flex;
    padding-left: 3vw;
    align-items: center;
  }

  .puppyInfo {
    position: absolute;
    background-color: #ffeeb1;
    border-radius: 5px;
    width: 74%;
    margin-left: 10vh;
    height: 10vh;
    z-index: -1;
  }

  h2 {
    margin-left: 25vw;
  }

  .infoEdit {
    color: #5c5c5c;
    font-size: 90%;
    margin-top: 15vh;
    margin-left: 34vw;
  }
`;

const PuppyImage = styled.img`
  height: 20vh;
  width: 20vh;
  border: 5px solid #ffeeb1;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;

const PuppyTitle = styled.div`
  color: #5c5c5c;

  .puppyName {
    display: flex;
    align-items: center;

    .paws {
      height: 4vh;
      margin-left: 2vw;
      padding: 0;
    }
  }
`;
const PuppyInfo = styled.div`
  padding: 3vw;
  color: #5c5c5c;

  .subdiv {
    padding-bottom: 2vh;
  }

  p {
    margin: 1.5vh 2vw;
    text-align: left;
    font-size: 120%;
  }

  .subtitle {
    color: #5c5c5c;
    font-weight: 900;
    border: none;
    background-color: #f1f1f1;
    border-radius: 4px;
    width: 30vw;
    height: 1.5 rem;
  }

  .birthDday {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .record {
    align-items: center;
  }
`;

const RegisterButton = styled.button`
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #ffeeb1;
  box-shadow: 0px 2px 5px 0.1px #5c5c5c;
  font-family: GmarketSansMedium;\
  color: #5c5c5c;
  border-radius: 10px;
  font-size: 110%;  
  margin-bottom: 3vh;
`;

const EditButton = styled.button`
  color: #81e3d7;
  font-size: 100%;
  margin-top: 15vh;
  margin-left: 32vw;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-weight: 900;
`;

function PetInfoDetail() {
  const puppy = useSelector(puppySelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchPupInfo(params.petId));
  }, []);

  const dogId = params.petId;
  const editButton = async () => {
    navigate(`/pet-info-edit/${dogId}`);
  };

  if (!puppy.pupInfo) {
    return <Spinner />;
  }

  return (
    <Wrap>
      <PuppyTitle>
        <div className="title">
          <h1>반려견 정보</h1>
        </div>
        <div className="puppyProfile">
          <div className="PuppyImage">
            <PuppyImage src={puppy.pupInfo.fileURL} />
          </div>
          <div className="puppyInfo">
            <div className="puppyName">
              <h2>
                {puppy.pupInfo.name}
                <span>&#40;{puppy.pupInfo.gender === 'FEMALE' ? '♀' : '♂'}&#41;</span>
              </h2>
              <img className="paws" src={paws} alt="paws" />
            </div>
          </div>
          <EditButton onClick={editButton}>정보수정</EditButton>
        </div>
      </PuppyTitle>
      <PuppyInfo>
        <div className="subdiv">
          <div className="subtitle">태어난 날은 ?</div>
          <div className="birthDday">
            <p>{puppy.pupInfo.birthdate}</p>
            <Dday />
          </div>
        </div>
        <div className="subdiv">
          <div className="subtitle">우리 아이는 ?</div>
          <p>{puppy.pupInfo.breedName}</p>
        </div>
        <div className="subdiv">
          <div className="subtitle">몸무게는 ?</div>
          <p>{puppy.pupInfo.weight} kg</p>
        </div>
        <div className="subdiv">
          <div className="subtitle">건강상태는 ?</div>
          <div className="record">
            <p className="neutered">중성화 여부</p>
            {puppy.pupInfo.neuter ? <img style={{ height: '5vh' }} src={o} alt="o" /> : <img style={{ height: '5vh' }} src={x} alt="x" />}
            <p className="disease">질병 경력</p>
            <p style={{ fontSize: '110%' }}>{puppy.pupInfo.disease}</p>
          </div>
        </div>
      </PuppyInfo>
      <Link to={`/pet-medical-card/${dogId}`}>
        <RegisterButton>강아지 수첩 바로가기</RegisterButton>
      </Link>
    </Wrap>
  );
}

export default PetInfoDetail;
