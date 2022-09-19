import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const StyledMain = styled.main`
  padding-top: 8vh;
  padding-bottom: 8vh;
  z-index: 1;
`;

function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <StyledMain>{props.children}</StyledMain>
      <Footer />
    </div>
  );
}
export default Layout;
