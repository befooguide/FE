import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// 컨테이너에 명시적 크기 지정
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  min-width: 100vh;
  border: none;
  position: relative;
  flex: 1;
`;

const ErrorMessage = styled.div`
  color: red;
  padding: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  z-index: 5;
`;

function KakaoMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // API 키 정의 - 환경변수 없을 경우 하드코딩된 값 사용
    const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    console.log("API Key 사용:", API_KEY);

    // 스크립트 로드 상태 확인 플래그
    let isScriptLoaded = false;
    let isScriptLoading = false;

    // 샘플 위치 데이터
    const sampleLocations = [
      {
        position: { lat: 37.5665, lng: 126.978 },
        title: "서울 시청",
        category: "정부기관",
      },
      {
        position: { lat: 37.5684, lng: 126.982 },
        title: "카카오 스페이스",
        category: "회사",
      },
      {
        position: { lat: 37.5707, lng: 126.975 },
        title: "제주 텐단과학 기술단지",
        category: "회사",
      },
      {
        position: { lat: 37.568, lng: 126.97 },
        title: "제주 농업회사법",
        category: "회사",
      },
    ];

    // 스크립트 로드 함수
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        // 이미 로드 중이거나 로드된 경우 중복 방지
        if (isScriptLoading) {
          console.log("이미 스크립트 로딩 중...");
          return;
        }

        if (isScriptLoaded) {
          console.log("이미 스크립트가 로드됨");
          resolve();
          return;
        }

        isScriptLoading = true;

        // 이미 script 태그가 존재하는지 확인
        const existingScript = document.querySelector(
          `script[src*="dapi.kakao.com/v2/maps/sdk.js"]`
        );

        if (existingScript) {
          console.log("이미 스크립트 태그가 존재함");
          isScriptLoaded = true;
          isScriptLoading = false;
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
          console.log("Kakao Maps SDK 로드 성공");
          isScriptLoaded = true;
          isScriptLoading = false;
          resolve();
        };

        script.onerror = (error) => {
          console.error("Kakao Maps SDK 로드 실패", error);
          isScriptLoading = false;
          reject(new Error("Kakao Maps SDK 로드 실패"));
        };

        document.head.appendChild(script);
        console.log("스크립트 태그 추가됨");
      });
    };

    // 지도 초기화 함수
    const initializeMap = () => {
      return new Promise((resolve, reject) => {
        try {
          // DOM 엘리먼트 체크 - ref를 사용하여 접근
          const container = mapContainerRef.current;
          if (!container) {
            throw new Error("Map container를 찾을 수 없습니다");
          }

          console.log("Map 컨테이너 확인됨, 지도 초기화 시작...");
          console.log(
            "컨테이너 크기:",
            container.offsetWidth,
            "x",
            container.offsetHeight
          );

          // 컨테이너 크기가 0이면 경고
          if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            console.warn(
              "경고: 맵 컨테이너의 크기가 0입니다. 지도가 표시되지 않을 수 있습니다."
            );
          }

          // 지도 옵션 설정
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
            level: 3, // 줌 레벨 (3으로 변경하여 더 가깝게 보이도록)
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
          mapInstanceRef.current = map; // 맵 인스턴스 저장

          console.log("지도 생성 성공");

          // 마커 추가
          sampleLocations.forEach((location) => {
            // 마커 이미지 설정 (카테고리에 따라 다른 이미지 사용 가능)
            let markerImage;

            if (location.category === "회사") {
              // bf 스타일의 마커 (초록색 원 형태)
              const imageSrc =
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
              const imageSize = new window.kakao.maps.Size(24, 35);
              markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize
              );
            }

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(
              location.position.lat,
              location.position.lng
            );

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: markerPosition,
              title: location.title,
              image: markerImage,
            });

            // 클릭 이벤트 추가
            window.kakao.maps.event.addListener(marker, "click", function () {
              console.log(`마커 클릭됨: ${location.title}`);

              // 지도 중심을 마커 위치로 이동
              map.setCenter(markerPosition);

              // 여기에 팝업 창 열기 등의 추가 동작 구현 가능
            });
          });

          // 지도 크기 재설정 (렌더링 문제 해결용)
          setTimeout(() => {
            map.relayout();
            console.log("지도 레이아웃 재설정 완료");
          }, 100);

          // 맵 클릭 이벤트 등록
          window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
            const latLng = mouseEvent.latLng;
            console.log(
              `클릭된 좌표: 위도(${latLng.getLat()}), 경도(${latLng.getLng()})`
            );
          });

          resolve(map);
        } catch (err) {
          console.error("지도 초기화 중 오류:", err);
          reject(err);
        }
      });
    };

    // 메인 함수: 스크립트 로드 및 지도 초기화
    const setupKakaoMap = async () => {
      try {
        console.log("카카오맵 설정 시작...");

        // 1. 이미 카카오 맵이 로드되어 있는지 확인
        if (window.kakao && window.kakao.maps) {
          console.log("Kakao SDK가 이미 로드되어 있음, 지도 초기화 진행");
          await initializeMap();
          setLoading(false);
          return;
        }

        // 2. 스크립트 로드
        console.log("Kakao Maps 스크립트 로드 시작");
        await loadScript();

        // 3. 카카오 지도 로드
        console.log("Kakao Maps load 함수 호출");
        window.kakao.maps.load(() => {
          console.log("Kakao Maps load 콜백 실행");

          // 4. 지도 초기화
          initializeMap()
            .then(() => {
              console.log("지도 초기화 완료");
              setLoading(false);
            })
            .catch((err) => {
              console.error("지도 초기화 실패:", err);
              setError(`지도 초기화 실패: ${err.message}`);
              setLoading(false);
            });
        });
      } catch (err) {
        console.error("카카오맵 설정 중 오류:", err);
        setError(`카카오맵 초기화 실패: ${err.message}`);
        setLoading(false);
      }
    };

    // DOM이 렌더링된 후 약간의 지연을 두고 실행
    const timer = setTimeout(() => {
      setupKakaoMap();
    }, 100);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearTimeout(timer);
      console.log("KakaoMap 컴포넌트 언마운트");
      // 필요한 경우 이벤트 리스너 제거 등의 정리 작업 수행
    };
  }, []);

  // 윈도우 리사이즈 대응을 위한 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        console.log("윈도우 크기 변경 감지, 지도 레이아웃 재설정");
        mapInstanceRef.current.relayout();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MapContainer ref={mapContainerRef} id="map">
        {loading && <LoadingMessage>지도를 불러오는 중...</LoadingMessage>}
      </MapContainer>
    </>
  );
}

export default KakaoMap;
