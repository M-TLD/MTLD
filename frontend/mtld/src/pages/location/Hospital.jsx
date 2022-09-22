import React, { useState } from 'react';
import styled from 'styled-components';
import KakaoMap from 'components/common/KakaoMap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

const Container = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
`;

const SearchDiv = styled.div`
  margin-top: 20px;
  // background-color: #FCFCFC;
  // width: 300px;
  // height: 40px;
  // // padding: 5px;
  // border: 2px solid #EBEBEB;
  // border-radius: 20px;  
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  background-color: #FCFCFC;
  width: 300px;
  height: 40px;
  // padding: 5px;
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
        <KakaoMap searchPlace={Place} flag={flag} />
      </Container>
    </div>
  );
}

export default Hospital;
