import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <div>Main</div>
      <div>
        <Link to="/survey-question">건강진단</Link>
      </div>
      <div>
        <Link to="/diary-home">산책일지</Link>
      </div>
      <div>
        <Link to="/location-main">애견동반장소</Link>
      </div>
      <div>
        <Link to="/info-board">꿀팁게시판</Link>
      </div>
      <div>
        <Link to="/adoption-survey">입양도우미</Link>
      </div>
      <div>
        <Link to="/adoption-home">유기견친구들</Link>
      </div>
    </div>
  );
}

export default Main;
