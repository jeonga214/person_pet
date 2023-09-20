import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

const { kakao } = window;

const KEYWORD_LIST = [
  { id: 1, value: '동물병원'},
  { id: 2, value: '동물약국'},
];

const theme = {
    colors: {
      primary: '#85afde', // 원하는 primary 색상을 여기에 지정
      warning: '#bde3f0', // 원하는 warning 색상을 여기에 지정
      white: '#eee294', // 원하는 white 색상을 여기에 지정
    },
  };

function CustomMap () {

  // 기본 위치 상태
  const [search, setSearch] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  // 카테고리 검색으로 주변 위치 검색하기
  const searchPlaces = (keyword) => {
    // 현재 위치가 없을 경우 함수 종료
    if (!state.center) return;
    // places 서비스 객체 생성
    const ps = new kakao.maps.services.Places();
    // 검색 옵션 설정
    const options = {
      location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
      radius: 6000,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };

    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      keyword,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearch(data); // 검색 결과를 search 상태에 저장
        } else {
          console.error('검색에 실패하였습니다.');
        }
      },
      options, // 검색 옵션 전달
    );
  };
  
  return (
    <ThemeProvider theme={theme}>
      <>
        {/* 지도 컴포넌트 */}
        <Map center={state.center} style={{ width: '100%', height: '852px', borderRadius :'30px'}} level={5}>
          
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: 'https://cdn-icons-png.flaticon.com/128/7124/7124723.png',
              size: {
                width: 50,
                height: 50,
              },
            }}
          />
          
          {/* 검색된 장소 마커 표시 */}
          {search.map((data) => (
            <MapMarker
              key={data.id}
              position={{ lat: data.y, lng: data.x }}
              image={{
                src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
                size: {
                  width: 35,
                  height: 35,
                },
              }}
            />
          ))}
          <SearchBtns>
            {KEYWORD_LIST.map((keywordObj) => (
              <button key={keywordObj.id} type='button' onClick={() => searchPlaces(keywordObj.value)}>
                {keywordObj.value}
              </button>
            ))}
          </SearchBtns>
        </Map>
      </>
    </ThemeProvider>
  );
};

export default CustomMap;

const SearchBtns = styled.div`
  position: absolute;
  top: 50px;
  right: 50%;
  transform: translateX(50%);
  z-index: 10;
  display: flex;
  gap: 10px;
  background-color: #dadada;
  padding:10px;
  border-radius :30px;

  button {
    width: 110px;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    border:none;
    font-size: 1.2em;
    color: ${({ theme }) => theme.colors.white};
    font-size:13px;
    font-weight:700;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.warning};
  }
`;