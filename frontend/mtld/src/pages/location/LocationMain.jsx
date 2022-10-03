import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HospitalLogo from 'assets/hospital.png';
import AccommodationLogo from 'assets/accommodation.png';
import RestaurantLogo from 'assets/restaurant.png';
import CafeLogo from 'assets/cafe.png';

const Container = styled.div`
  margin-top: 115px;
  @media screen and (min-width: 768px) {
    margin-top: 250px; 
  }
`;

const Title = styled.span`
  font-size: 24px;
  color: #5C5C5C;
`;

const Highlight = styled.span`
  font-weight: 600;
  color: ${(props) => props.fontColor}; 
`;

const MenuGroup = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 768px) {
    flex-wrap: nowrap;
    gap: 30px;
  }
`;

const MenuItem = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    width: 144px;
  }
`;

const ItemDiv = styled.div`
  width: 110px;
  height: 120px;
  background-color: #F0F0F0;
  margin: 10px;
  border-radius: 10px;
  font-size: 15px;
`;

const MenuImage = styled.img`
  height: 60px;
  margin-top: 23px;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    color: #5C5C5C;
    font-size: 13px;
    }
`;

function LocationMain() {
  return (
    <div>
      <Container>
        <Title>
          내 아이와
          <Highlight> 함께 </Highlight>
          갈 수 있는
          <br />
          <Highlight fontColor="#81E3D7">반려견 동반가능 </Highlight>
          장소들
        </Title>
        <MenuGroup>
          <MenuItem>
            <ItemDiv>
              <StyledLink to="/hospital">
                <div>
                  <MenuImage src={HospitalLogo} />
                </div>
                병원
              </StyledLink>
            </ItemDiv>
          </MenuItem>
          <MenuItem>
            <ItemDiv>
              <StyledLink to="/accomodation">
                <div>
                  <MenuImage src={AccommodationLogo} />
                </div>
                숙소
              </StyledLink>
            </ItemDiv>
          </MenuItem>
          <MenuItem>
            <ItemDiv>
              <StyledLink to="/cafe">
                <div>
                  <MenuImage src={CafeLogo} />
                </div>
                카페
              </StyledLink>
            </ItemDiv>
          </MenuItem>
          <MenuItem>
            <ItemDiv>
              <StyledLink to="/restaurant">
                <div>
                  <MenuImage src={RestaurantLogo} />
                </div>
                식당
              </StyledLink>
            </ItemDiv>
          </MenuItem>
        </MenuGroup>
      </Container>
    </div>
  );
}

export default LocationMain;
