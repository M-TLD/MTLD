import React, { useState } from 'react';
import KakaoMap from 'components/common/KakaoMap';

function Hospital() {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <KakaoMap searchPlace={Place} />
    </div>
  );
}

export default Hospital;
