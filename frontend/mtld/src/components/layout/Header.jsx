import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from 'assets/mung.png';
import Paw from 'assets/paw_yellow.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { fetchUserInfo, logout, userSelector } from 'app/user';
import { fetchPuppyInfo, puppySelector } from 'app/puppy';
import Spinner from 'components/common/Spinner';

const StyledHeader = styled.header`
  .Contents {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-left: 2vh;
  }

  .navBar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .gapDiv {
    display: flex;
    gap: 10px;
  }

  .menuDiv {
    display: flex;
    justify-content: space-between;
  }

  .userDiv {
    display: flex;
    align-items: center;
    gap: 3vw;
  }

  .userInfoDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1vh;
  }

  a {
    text-decoration: none;
    color: #5c5c5c;
    font-family: 'UhBeeStrawberry';
    font-size: 19px;
    font-weight: bold;
  }

  .logout {
    color: #5c5c5c;
    font-family: 'UhBeeStrawberry';
    font-size: 19px;
    font-weight: bold;
  }

  .name {
    font-size: 20px;
  }
`;

const LogoImage = styled.img`
  height: 4vh;
  z-index: 100;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationNow = useLocation();
  const puppy = useSelector(puppySelector);
  const user = useSelector(userSelector);
  const [isLoading, setLoading] = useState(true);

  const [expand, setExpand] = React.useState(false);
  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  if (locationNow.pathname === '/login') return null;
  if (!user.loading && !puppy.loading) {
    return (
      <StyledHeader>
        <Accordion expanded={expand} sx={{ bgcolor: '#ffeeb1', zIndex: '100', width: '100vw', position: 'fixed' }}>
          <AccordionSummary expandIcon={<MenuIcon onClick={toggleAccordion} />} aria-controls="panel1a-content" id="panel1a-header">
            <div className="navBar">
              <Link className="Link" to="/" style={{ zIndex: '100' }}>
                <LogoImage src={Logo} />
              </Link>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="menuDiv">
              <div
                className="userDiv"
                onClick={() => {
                  navigate('/mypage');
                }}
                onKeyDown={() => {
                  navigate('/mypage');
                }}
                role="button"
                tabIndex={0}
              >
                <Avatar src={Paw} sx={{ height: '7vh', width: '7vh' }} />
                {/* <p className="name">사용자</p> */}
              </div>
              <div className="userInfoDiv">
                <a href="/mypage">마이페이지</a>
                <div
                  className="logout"
                  onClick={() => {
                    dispatch(logout());
                    window.alert('성공적으로 로그아웃 되었습니다');
                    navigate('/login');
                  }}
                  onKeyDown={() => {
                    dispatch(logout());
                  }}
                  role="button"
                  tabIndex={0}
                >
                  로그아웃
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </StyledHeader>
    );
  }
  if (puppy.puppyInfo) {
    return (
      <StyledHeader>
        <Accordion expanded={expand} sx={{ bgcolor: '#ffeeb1', zIndex: '100', width: '100vw', position: 'fixed' }}>
          <AccordionSummary expandIcon={<MenuIcon onClick={toggleAccordion} />} aria-controls="panel1a-content" id="panel1a-header">
            <div className="navBar">
              <Link className="Link" to="/" style={{ zIndex: '100' }}>
                <LogoImage src={Logo} />
              </Link>
            </div>
          </AccordionSummary>
          {puppy.puppyInfo.length === 0 ? (
            <AccordionDetails>
              <div className="menuDiv">
                <div
                  className="userDiv"
                  onClick={() => {
                    navigate('/mypage');
                  }}
                  onKeyDown={() => {
                    navigate('/mypage');
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <Avatar src={Paw} sx={{ height: '7vh', width: '7vh' }} />
                  <p className="name">{user.userInfo.name}</p>
                </div>
                <div className="userInfoDiv">
                  <a href="/mypage">마이페이지</a>
                  <div
                    className="logout"
                    onClick={() => {
                      dispatch(logout());
                      window.alert('성공적으로 로그아웃 되었습니다');
                      navigate('/login');
                    }}
                    onKeyDown={() => {
                      dispatch(logout());
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    로그아웃
                  </div>
                </div>
              </div>
            </AccordionDetails>
          ) : (
            <AccordionDetails>
              <div className="menuDiv">
                <div className="userDiv">
                  <Avatar src={puppy.puppyInfo[0].fileURL} sx={{ height: '7vh', width: '7vh' }} />
                  <p className="name">{user.userInfo.name}</p>
                </div>
                <div className="userInfoDiv">
                  <a href="/mypage">마이페이지</a>
                  <div
                    className="logout"
                    onClick={() => {
                      dispatch(logout());
                      window.alert('성공적으로 로그아웃 되었습니다');
                      navigate('/login');
                    }}
                    onKeyDown={() => {
                      dispatch(logout());
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    로그아웃
                  </div>
                </div>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </StyledHeader>
    );
  }
}

export default Header;
