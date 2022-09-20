import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-top: 9vh;
`;
function MyPage() {
  const user = useSelector((state) => state.user.value);
  return (
    <Wrap>
      <div>
        <h1>My Page</h1>
        <p>{user.name}</p>
        <p>{user.oauthId}</p>
      </div>
    </Wrap>
  );
}

export default MyPage;
