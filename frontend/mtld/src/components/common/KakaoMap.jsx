/* global kakao */
import React, { useRef, useEffect, useState } from 'react';

function KakaoMap({ searchPlace, flag }) {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  let lat;
  let long;
  useEffect(() => {
    console.log(searchPlace);
    console.log(flag);
    // geoloaction으로 사용할 수 있다면
    if (navigator.geolocation) {
    // GeoLocation을 이용해 접속 위치 얻어오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude; // 위도
          long = position.coords.longitude; // 경도
          console.log(lat, long);
          // 검색하지 않았을 때
          if (searchPlace === '' && flag === false) {
            const options = {
            // 지도를 생성할 때 필요한 기본 옵션
              center: new window.kakao.maps.LatLng(lat, long),
              // 지도의 중심좌표: 현위치의 위도 경도 받아서 넣기
              level: 3, // 지도의 레벨(확대, 축소 정도)
            };
            const container = document.getElementById('map');
            const kakaoMap = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 얘 뭔데
            setMap(kakaoMap);
          } else if (flag === true) {
            console.log('버튼 눌렀을 때');
            const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
            ps.keywordSearch('동물병원', placeSearchCB, {
              location: new window.kakao.maps.LatLng(lat, long),
            });
            function placeSearchCB(data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i += 1) {
                  displayMarker(data[i]);
                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                displayPagination(pagination);
                setPlaces(data);
              }
            }
            // 검색결과 목록 하단에 페이지 번호 표시
            function displayPagination(pagination) {
              const paginationEl = document.getElementById('pagination');
              const fragment = document.createDocumentFragment();
              let i;
              // 기존에 추가된 페이지 번호 삭제
              while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
              }
              for (i = 1; i <= pagination.last; i += 1) {
                const el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;
                if (i === pagination.current) {
                  el.className = 'on';
                } else {
                  el.onclick = (function (i) {
                    return function () {
                      pagination.gotoPage(i);
                    };
                  }(i));
                }
                fragment.appendChild(el);
              }
              paginationEl.appendChild(fragment);
            }

            function displayMarker(place) {
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
              });
              // 마커 누르면 인포윈도우에 장소명 나옴
              kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
                infowindow.open(map, marker);
              });
            }
          } else {
            const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
            ps.keywordSearch(searchPlace, placeSearchCB);
            function placeSearchCB(data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i += 1) {
                  displayMarker(data[i]);
                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                displayPagination(pagination);
                setPlaces(data);
              }
            }

            // 검색결과 목록 하단에 페이지 번호 표시
            function displayPagination(pagination) {
              const paginationEl = document.getElementById('pagination');
              const fragment = document.createDocumentFragment();
              let i;
              // 기존에 추가된 페이지 번호 삭제
              while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
              }
              for (i = 1; i <= pagination.last; i += 1) {
                const el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;
                if (i === pagination.current) {
                  el.className = 'on';
                } else {
                  el.onclick = (function (i) {
                    return function () {
                      pagination.gotoPage(i);
                    };
                  }(i));
                }
                fragment.appendChild(el);
              }
              paginationEl.appendChild(fragment);
            }

            function displayMarker(place) {
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
              });
              // 마커 누르면 인포윈도우에 장소명 나옴
              kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
                infowindow.open(map, marker);
              });
            }
          }
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
  }, [searchPlace, flag]);

  return (
    <div>
      <div
        id="map"
        style={{ width: '500px', height: '500px' }}
      />
      <div id="result">
        {places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <div>
              <p>{item.place_name}</p>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination" />
      </div>
    </div>

  );
}

export default KakaoMap;
