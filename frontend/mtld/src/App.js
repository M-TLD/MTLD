import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import PrivateRoutes from './components/auth/PrivateRoutes';

import Layout from './components/layout/Layout';
import AbandonedDetail from './components/adoption/AbandonedDetail';
import AdoptionHome from './pages/adoption/AdoptionHome';
import AdoptionResult from './pages/adoption/AdoptionResult';
import AdoptionSurvey from './pages/adoption/AdoptionSurvey';
import DiaryCreate from './pages/diary/DiaryCreate';
import DiaryDetail from './pages/diary/DiaryDetail';
import DiaryHome from './pages/diary/DiaryHome';
import NotFound from './pages/etc/NotFound';
import InfoBoard from './pages/info/InfoBoard';
import Accommodation from './pages/location/Accommodation';
import Cafe from './pages/location/Cafe';
import Hospital from './pages/location/Hospital';
import LocationMain from './pages/location/LocationMain';
import Restaurant from './pages/location/Restaurant';
import SurveyQuestion from './pages/prediction/SurveyQuestion';
import SurveyResult from './pages/prediction/SurveyResult';
import Login from './pages/user/Login';
import Main from './pages/user/Main';
import MyPage from './pages/user/MyPage';
import PetInfoCreate from './pages/user/PetInfoCreate';
import PetInfoDetail from './pages/user/PetInfoDetail';
import PetMedicalCard from './pages/user/PetMedicalCard';
import Kakao from './pages/user/Kakao';

const theme = createTheme({
  typography: {
    fontFamily: 'GmarketSansMedium',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& label': {
            fontSize: 12,
            margin: 0,
            padding: 0,
          },
        },
        input: {
          height: '1.5rem',
          fontSize: 2,
        },
        listbox: {
          fontSize: 1,
          textAlign: 'left',
        },
        popupIndicator: {
          // 드롭다운 화살표
          color: '#81E3D7',
        },
      },
    },
    MuiTextfield: {
      styleOverrides: {
        fontSize: 1,
        label: {
          fontSize: 1,
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<NotFound />} exact />
              <Route path="/login/oauth2/kakao" element={<Kakao />} exact />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Main />} exact />
                <Route path="/mypage" element={<MyPage />} exact />
                <Route path="/pet-info-create" element={<PetInfoCreate />} exact />
                <Route path="/pet-info-detail" element={<PetInfoDetail />} exact />
                <Route path="/pet-medical-card" element={<PetMedicalCard />} exact />
                <Route path="/adoption-home" element={<AdoptionHome />} exact />
                <Route path="/adoption-result" element={<AdoptionResult />} exact />
                <Route path="/abandoned-detail/:id" element={<AbandonedDetail />} exact />
                <Route path="/adoption-survey" element={<AdoptionSurvey />} exact />
                <Route path="/diary-create" element={<DiaryCreate />} exact />
                <Route path="/diary/:diaryId" element={<DiaryDetail />} exact />
                <Route path="/diary-home" element={<DiaryHome />} exact />
                <Route path="/info-board" element={<InfoBoard />} exact />
                <Route path="/accomodation" element={<Accommodation />} exact />
                <Route path="/cafe" element={<Cafe />} exact />
                <Route path="/hospital" element={<Hospital />} exact />
                <Route path="/location-main" element={<LocationMain />} exact />
                <Route path="/restaurant" element={<Restaurant />} exact />
                <Route path="/survey-question" element={<SurveyQuestion />} exact />
                <Route path="/survey-result" element={<SurveyResult />} exact />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
