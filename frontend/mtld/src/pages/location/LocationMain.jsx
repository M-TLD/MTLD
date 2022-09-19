import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuGroup = styled.div``;
const MenuItem = styled.div``;
const MenuImage = styled.img``;
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
      <MenuGroup>
        <MenuItem>
          <StyledLink to="/hospital">
            <div>
              <MenuImage />
            </div>
            병원
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/accomodation">
            <div>
              <MenuImage />
            </div>
            숙소
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/cafe">
            <div>
              <MenuImage />
            </div>
            카페
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/restaurant">
            <div>
              <MenuImage />
            </div>
            식당
          </StyledLink>
        </MenuItem>
      </MenuGroup>
    </div>
  );
}

export default LocationMain;
