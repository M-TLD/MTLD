import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledItem = styled.div``;

function AbandonedDetail() {
  const url = window.location.href;
  const id = url.split('/')[4];

  const [puppy, setPuppy] = useState([]);

  useEffect(() => {
    axios
      .get(`https://mtld-2d290-default-rtdb.firebaseio.com/abandoned/${id}.json`)
      .then((res) => res.data)
      .then((data) => {
        setPuppy(data);
      });
  }, []);
  console.log(puppy);

  return (
    <StyledItem>
      <img
        src={puppy.img}
        alt="puppy"
        width="300px"
        height="300px"
        style={{ overflow: 'hidden' }}
      />
      <p>
        <span>{puppy.num}</span>
      </p>
      <p>
        <span>{puppy.date}</span>
      </p>
    </StyledItem>
  );
}

export default AbandonedDetail;
