/* global kakao */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import dummy from 'data/RestaurantData.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultList = styled.div`
  background-color: #F8F7F7;
  margin-top: 15px;
  border-radius: 10px;
`;

const ResultItem = styled.div`
  padding: 15px;
`;

const ItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PlaceDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  
`;
const StyledLocalCafeIcon = styled(LocalCafeIcon)`
  // color: #646464;
  vertical-align: middle;
  margin-right: 5px;
`;

const PlaceName = styled.span`
  font-size: 15px;
`;

const Phone = styled.a`
  font-size: 10px;
  color: black;
  text-decoration: none;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const Address = styled.span`
  font-size: 12px;
`;

const ImgDiv = styled.div`
  width: 100px;  
  height: 65px;
  // overflow: hidden;
  // object-fit: cover;
`;

const PlaceImg = styled.img`
  width: 100px;  
  height: 65px;
  overflow: hidden;
  object-fit: cover;
`;

const Line = styled.hr`
  margin: 0;
  color: #C7C7C7;
`;

function RestaurantMap({ searchPlace, flag }) {
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
            // dummy.map(context, idx) => {

            // }
            const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
            ps.keywordSearch('반려견동반카페', placeSearchCB, {
              location: new window.kakao.maps.LatLng(lat, long),
              // radius: 3000, // 3km
              sort: kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
              category_group_code: 'CE7', // 카테고리 그룹 코드 - 카페
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
              //   console.log(data);
              // console.log(dummy);
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
              const imageSrc = 'https://cdn-icons-png.flaticon.com/512/5695/5695709.png';
              const imageSize = new kakao.maps.Size(30, 32);
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage,
              });

              console.log('place = ', place);
              console.log('타입 = ', typeof (place));
              dummy.forEach((content, idx) => {
                const contentName = String(content.name);
                if (contentName.includes(place.place_name)) {
                  place.img = content.image;
                }
              });
              if (place.img === undefined) {
                place.img = 'https://s3-ap-northeast-1.amazonaws.com/dcicons/new/images/web/noimage/1.jpg';
              }
              console.log('place = ', place);
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
              const imageSrc = 'https://cdn-icons-png.flaticon.com/512/5695/5695709.png';
              const imageSize = new kakao.maps.Size(30, 32);
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(place.y, place.x),
                image: markerImage,
              });
              dummy.forEach((content, idx) => {
                const contentName = String(content.name);
                if (contentName.includes(place.place_name)) {
                  place.img = content.image;
                }
              });
              if (place.img === undefined) {
                place.img = 'https://s3-ap-northeast-1.amazonaws.com/dcicons/new/images/web/noimage/1.jpg';
              }
              console.log('place = ', place);
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
      <Container>
        <div
          id="map"
          style={{ width: '300px', height: '300px' }}
        />
        <ResultList>
          {places.map((item, i) => (
            <div key={i}>
              <ResultItem>
                <ItemDiv>
                  <PlaceDiv>
                    <div>
                      <StyledLocalCafeIcon fontSize="small" />
                      <PlaceName>{item.place_name}</PlaceName>
                    </div>
                    <Phone href="tel:{item.phone}">{item.phone}</Phone>
                    <Address>{item.address_name}</Address>
                  </PlaceDiv>
                  <ImgDiv>
                    <PlaceImg src={item.img} alt="placeImg" />
                  </ImgDiv>
                </ItemDiv>
              </ResultItem>
              <div />
              <Line />
            </div>
          ))}
          <div id="pagination" style={{ margin: '10px' }} />
        </ResultList>
      </Container>
    </div>

  );
}

export default RestaurantMap;
