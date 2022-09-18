import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/oauth2/kakao" element={<Kakao />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/pet-info-create" element={<PetInfoCreate />} />
            <Route path="/pet-info-detail/:petId" element={<PetInfoDetail />} />
            <Route path="/pet-medical-card/:petId" element={<PetMedicalCard />} />
            <Route path="/adoption-home" element={<AdoptionHome />} />
            <Route path="/adoption-result" element={<AdoptionResult />} />
            <Route path="/adoption-survey" element={<AdoptionSurvey />} />
            <Route path="/diary-create" element={<DiaryCreate />} />
            <Route path="/diary/:diaryId" element={<DiaryDetail />} />
            <Route path="/diary-home" element={<DiaryHome />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/info-board" element={<InfoBoard />} />
            <Route path="/accomodation" element={<Accommodation />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/location-main" element={<LocationMain />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/survey-question" element={<SurveyQuestion />} />
            <Route path="/survey-result" element={<SurveyResult />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
