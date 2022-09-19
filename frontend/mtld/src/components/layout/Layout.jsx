import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const StyledMain = styled.main`
<<<<<<< HEAD
  padding-top: 9vh;
  padding-bottom: 9vh;
  z-index: 1;
=======
  padding-top: 8vh;
  padding-bottom: 8vh;
>>>>>>> 1925b3332128604afdee502d67bf9b37ab8962b3
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
