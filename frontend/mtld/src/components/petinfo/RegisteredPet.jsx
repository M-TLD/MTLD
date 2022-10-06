import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePuppyInfo, fetchPuppyInfo, puppySelector } from 'app/puppy';
import Spinner from 'components/common/Spinner';
import YNModal from 'components/common/YNModal';

const Wrap = styled.div`
  margin: 0;
  padding: 0;
`;

const PuppyInfo = styled.div`
  display: flex;
  margin: 2vh;
  height: 20vh;

  .puppyInfo {
    padding-left: 5vw;
  }

  h2 {
    color: #5c5c5c;
    text-align: left;
    margin: 0;
    padding-bottom: 2vh;
  }

  .name-gender {
    display: flex;
  }

  p {
    color: #5c5c5c;
    text-align: left;
    margin: 0;
  }

  .buttonDiv {
    display: flex;
    width: 100%;
    margin-top: 1vh;
    gap: 1vw;
  }

  button {
    border-radius: 5px;
    height: 1.5rem;
    border: none;
    background-color: #ffeeb1;
    color: #5C5C5C;
    &:hover,
    &:active {
      cursor: pointer;
     }
  }
`;

const PuppyImage = styled.img`
  height: 20vh;
  width: 20vh;
  border: 3px solid #ffeeb1;
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
`;

function RegisteredPet() {
  const dispatch = useDispatch();
  const puppy = useSelector(puppySelector);

  useEffect(() => {
    dispatch(fetchPuppyInfo());
  }, []);

  const deleteButton = async (puppyId) => {
    const action = await dispatch(deletePuppyInfo(puppyId));
  };

  if (!puppy.loading) {
    return <Spinner />;
  }

  if (puppy.puppyInfo.length === 1) {
    return (
      <Wrap>
        <PuppyInfo>
          <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
            <div className="puppyImage">
              <PuppyImage src={puppy.puppyInfo[0].fileURL} alt="" />
            </div>
          </Link>
          <div className="puppyInfo">
            <div className="name-gender">
              <h2>{puppy.puppyInfo[0].name}</h2>
              <h2>&#40;{puppy.puppyInfo[0].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
            </div>
            <p>{puppy.puppyInfo[0].breedName}</p>
            <p>{puppy.puppyInfo[0].birthdate}일 생</p>
            <div className="buttonDiv">
              <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
                <button type="button">세부정보</button>
              </Link>
              <YNModal puppyId="0" />
            </div>
          </div>
        </PuppyInfo>
      </Wrap>
    );
  }
  if (puppy.puppyInfo.length === 2) {
    return (
      <div>
        <Wrap>
          <PuppyInfo>
            <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
              <div className="puppyImage">
                <PuppyImage src={puppy.puppyInfo[0].fileURL} alt="" />
              </div>
            </Link>
            <div className="puppyInfo">
              <div className="name-gender">
                <h2>{puppy.puppyInfo[0].name}</h2>
                <h2>&#40;{puppy.puppyInfo[0].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
              </div>
              <p>{puppy.puppyInfo[0].breedName}</p>
              {/* 날짜 파싱은 나중에... ^^...  */}
              <p>{puppy.puppyInfo[0].birthdate}일 생</p>
              <div className="buttonDiv">
                <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
                  <button type="button">세부정보</button>
                </Link>
                <YNModal puppyId="0" />
              </div>
            </div>
          </PuppyInfo>
        </Wrap>
        <Wrap>
          <PuppyInfo>
            <Link to={`/pet-info-detail/${puppy.puppyInfo[1].id}`}>
              <div className="puppyImage">
                <PuppyImage src={puppy.puppyInfo[1].fileURL} alt="" />
              </div>
            </Link>
            <div className="puppyInfo">
              <div className="name-gender">
                <h2>{puppy.puppyInfo[1].name}</h2>
                <h2>&#40;{puppy.puppyInfo[1].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
              </div>
              <p>{puppy.puppyInfo[1].breedName}</p>
              {/* 날짜 파싱은 나중에... ^^...  */}
              <p>{puppy.puppyInfo[1].birthdate}일 생</p>
              <div className="buttonDiv">
                <Link to={`/pet-info-detail/${puppy.puppyInfo[1].id}`}>
                  <button type="button">세부정보</button>
                </Link>
                <YNModal puppyId="1" />
              </div>
            </div>
          </PuppyInfo>
        </Wrap>
      </div>
    );
  }
  if (puppy.puppyInfo.length === 3) {
    return (
      <div>
        <Wrap>
          <PuppyInfo>
            <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
              <div className="puppyImage">
                <PuppyImage src={puppy.puppyInfo[0].fileURL} alt="" />
              </div>
            </Link>
            <div className="puppyInfo">
              <div className="name-gender">
                <h2>{puppy.puppyInfo[0].name}</h2>
                <h2>&#40;{puppy.puppyInfo[0].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
              </div>
              <p>{puppy.puppyInfo[0].breedName}</p>
              {/* 날짜 파싱은 나중에... ^^...  */}
              <p>{puppy.puppyInfo[0].birthdate}일 생</p>
              <div className="buttonDiv">
                <Link to={`/pet-info-detail/${puppy.puppyInfo[0].id}`}>
                  <button type="button">세부정보</button>
                </Link>
                <YNModal puppyId="0" />
              </div>
            </div>
          </PuppyInfo>
        </Wrap>
        <Wrap>
          <PuppyInfo>
            <Link to={`/pet-info-detail/${puppy.puppyInfo[1].id}`}>
              <div className="puppyImage">
                <PuppyImage src={puppy.puppyInfo[1].fileURL} alt="" />
              </div>
            </Link>
            <div className="puppyInfo">
              <div className="name-gender">
                <h2>{puppy.puppyInfo[1].name}</h2>
                <h2>&#40;{puppy.puppyInfo[1].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
              </div>
              <p>{puppy.puppyInfo[1].breedName}</p>
              {/* 날짜 파싱은 나중에... ^^...  */}
              <p>{puppy.puppyInfo[1].birthdate}일 생</p>
              <div className="buttonDiv">
                <Link to={`/pet-info-detail/${puppy.puppyInfo[1].id}`}>
                  <button type="button">세부정보</button>
                </Link>
                <YNModal puppyId="1" />
              </div>
            </div>
          </PuppyInfo>
        </Wrap>
        <Wrap>
          <PuppyInfo>
            <Link to={`/pet-info-detail/${puppy.puppyInfo[2].id}`}>
              <div className="puppyImage">
                <PuppyImage src={puppy.puppyInfo[2].fileURL} alt="" />
              </div>
            </Link>
            <div className="puppyInfo">
              <div className="name-gender">
                <h2>{puppy.puppyInfo[2].name}</h2>
                <h2>&#40;{puppy.puppyInfo[2].gender === 'FEMALE' ? '♀' : '♂'}&#41;</h2>
              </div>
              <p>{puppy.puppyInfo[2].breedName}</p>
              {/* 날짜 파싱은 나중에... ^^...  */}
              <p>{puppy.puppyInfo[2].birthdate}일 생</p>
              <div className="buttonDiv">
                <Link to={`/pet-info-detail/${puppy.puppyInfo[2].id}`}>
                  <button type="button">세부정보</button>
                </Link>
                <YNModal puppyId="2" />
              </div>
            </div>
          </PuppyInfo>
        </Wrap>
      </div>
    );
  }
}

export default RegisteredPet;
