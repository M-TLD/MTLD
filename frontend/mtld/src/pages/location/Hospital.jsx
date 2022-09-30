import React, { useState } from 'react';
import styled from 'styled-components';
import HospitalMap from 'components/location/HospitalMap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import HospitalLogo from 'assets/hospital.png';

const Container = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 27px;
  color: #5C5C5C;
  line-height: 30px;
`;

const Title = styled.span`
  margin-top: 5px;
`;

const Highlight = styled.span`
  color: #81E3D7;
  font-weight: 600;
`;

const HospitalImg = styled.img`
  height: 8vh;
`;

const SearchDiv = styled.div`
  margin: 15px 0 5px 0;   
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  background-color: #FCFCFC;
  width: 300px;
  height: 40px;
  border: 2px solid #EBEBEB;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  width: 250px;
  line-height: 40px;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  &:placeholder {
    color: #888888;
    font-family: 'GmarketSansMedium';
  }
`;

const SearchBtn = styled.button`
  background-color: #FCFCFC;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSearchRoundedIcon = styled(SearchRoundedIcon)`
  color: #646464;
`;

const CurrentPositiondiv = styled.div`
  display: flex;
  gap: 5px;
  margin: 0 0 5px 180px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledPlaceRoundedIcon = styled(PlaceRoundedIcon)`
  color: #81E3D7;
`;

const CurrentPosition = styled.span`
  color: #5C5C5C;  
  font-size: 14px;
  font-family: 'GmarketSansMedium';
`;

function Hospital() {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');
  const [flag, setFlag] = useState(false);
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText('');
    setFlag(false);
  };

  const handleChange = () => {
    setFlag(true);
  };

  return (
    <div>
      <Container>
        <TitleDiv>
          <Title>
            현재 우리 아이
            <br />
            주변의
            <Highlight> 동물병원</Highlight>
          </Title>
          <HospitalImg src={HospitalLogo} />
        </TitleDiv>
        <SearchDiv>
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
            <SearchBtn type="submit">
              <StyledSearchRoundedIcon fontSize="medium" />
            </SearchBtn>
          </SearchForm>
        </SearchDiv>
        <CurrentPositiondiv>
          <StyledPlaceRoundedIcon fontSize="medium" />
          <CurrentPosition onClick={handleChange}>현재 위치 중심</CurrentPosition>
        </CurrentPositiondiv>
        <HospitalMap searchPlace={Place} flag={flag} />
      </Container>
    </div>
  );
}

export default Hospital;
