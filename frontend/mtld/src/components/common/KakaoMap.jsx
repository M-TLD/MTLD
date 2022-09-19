/* global kakao */
import React, { useRef, useEffect, useState } from 'react';

function KakaoMap() {
  const [map, setMap] = useState(null);
  let lat;
  let long;
  useEffect(() => {
    // geoloaction으로 사용할 수 있다면
    if (navigator.geolocation) {
    // GeoLocation을 이용해 접속 위치 얻어오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude; // 위도
          long = position.coords.longitude; // 경도
          console.log(lat, long);

          const options = {
            // 지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(lat, long),
            // 지도의 중심좌표: 제주도 카카오 -> 현위치로 바꿔야함
            level: 3, // 지도의 레벨(확대, 축소 정도)
          };
          const container = document.getElementById('map');
          const kakaoMap = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 얘 뭔데
          setMap(kakaoMap);
        },
        // (error) => {
        //   lat = false;
        //   long = false;

        //   throw new Error(error);
        // },

      );
    } else {
      lat = false;
      long = false;
    }

    return () => {};
  }, []);

  return (
    <div
      id="map"
      style={{ width: '500px', height: '500px' }}

    />
  );
}

export default KakaoMap;
