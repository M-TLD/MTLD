import React, { useState } from 'react';
import KakaoMap from 'components/common/KakaoMap';

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
      <form onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <KakaoMap searchPlace={Place} flag={flag} />
      <button type="button" onClick={handleChange}>현재위치중심</button>
    </div>
  );
}

export default Hospital;
