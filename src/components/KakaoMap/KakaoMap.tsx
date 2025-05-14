import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Marker {
  id: number;
  name: string;
  location: string;
  time: string;
  lat: number;
  lng: number;
  isOfficial: boolean;
  isPersonal: boolean;
}

interface KakaoMapProps {
  markers: Marker[];
  selectedMarkerId: number | null;
  onMarkerClick: (id: number) => void;
}

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

function KakaoMap({
  markers = [],
  selectedMarkerId = null,
  onMarkerClick = () => {},
}: KakaoMapProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: number]: any }>({});

  // 디버깅 용도로 선택된 마커ID와 마커 데이터 로깅
  useEffect(() => {
    console.log("현재 선택된 마커 ID:", selectedMarkerId);
    console.log("현재 마커 데이터:", markers);
  }, [selectedMarkerId, markers]);

  // 첫 번째 useEffect: 카카오맵 초기화
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    console.log("API Key 사용:", API_KEY);

    let isScriptLoaded = false;
    let isScriptLoading = false;

    // 스크립트 로드 함수
    const loadScript = (): Promise<void> => {
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
    const initializeMap = (): Promise<any> => {
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

          // 기본 중심점 (서울 시청)
          const defaultCenter = new window.kakao.maps.LatLng(37.5665, 126.978);

          // 마커가 있으면 첫 번째 마커의 위치를 중심으로 설정
          const centerPosition =
            markers.length > 0
              ? new window.kakao.maps.LatLng(markers[0].lat, markers[0].lng)
              : defaultCenter;

          // 지도 옵션 설정 - 줌 레벨 3으로 명시적 설정
          const options = {
            center: centerPosition,
            level: 3, // 줌 레벨 3으로 고정 (숫자가 작을수록 더 확대됨, 1-14 범위)
          };

          console.log("지도 옵션:", options);

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
          mapInstanceRef.current = map; // 맵 인스턴스 저장

          // 지도 줌 레벨 확인 로깅
          console.log("초기 지도 줌 레벨:", map.getLevel());

          // 모든 마커를 포함하는 영역 생성
          if (markers.length > 1) {
            // 마커가 여러 개일 경우 모든 마커를 포함하는 영역 계산
            const bounds = new window.kakao.maps.LatLngBounds();

            markers.forEach((marker) => {
              bounds.extend(
                new window.kakao.maps.LatLng(marker.lat, marker.lng)
              );
            });

            // 지도가 모든 마커를 포함하도록 영역 설정
            map.setBounds(bounds);

            console.log("지도가 모든 마커를 표시하도록 영역 설정됨");
            console.log("경계 설정 후 줌 레벨:", map.getLevel());

            // 경계 설정 후에도 줌 레벨 3으로 강제 설정
            map.setLevel(3);
            console.log("줌 레벨 3으로 강제 설정됨:", map.getLevel());
          }

          console.log("지도 생성 성공");

          // 지도 크기 재설정 (렌더링 문제 해결용)
          setTimeout(() => {
            map.relayout();
            console.log("지도 레이아웃 재설정 완료");
            console.log("재설정 후 줌 레벨:", map.getLevel());
          }, 100);

          // 맵 클릭 이벤트 등록
          window.kakao.maps.event.addListener(
            map,
            "click",
            (mouseEvent: any) => {
              const latLng = mouseEvent.latLng;
              console.log(
                `클릭된 좌표: 위도(${latLng.getLat()}), 경도(${latLng.getLng()})`
              );
            }
          );

          // 줌 변경 이벤트 감지
          window.kakao.maps.event.addListener(map, "zoom_changed", function () {
            console.log("줌 레벨이 변경됨:", map.getLevel());
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
            .catch((err: Error) => {
              console.error("지도 초기화 실패:", err);
              setError(`지도 초기화 실패: ${err.message}`);
              setLoading(false);
            });
        });
      } catch (err) {
        console.error("카카오맵 설정 중 오류:", err);
        setError(
          `카카오맵 초기화 실패: ${
            err instanceof Error ? err.message : "알 수 없는 오류"
          }`
        );
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
      // 필요한 경우, 마커들 제거
      Object.values(markersRef.current).forEach((marker) => {
        if (marker) marker.setMap(null);
      });
    };
  }, []); // 맵 초기화는 한 번만 실행

  // 마커 업데이트 효과
  useEffect(() => {
    // 지도와 카카오 맵 객체가 준비되었는지 확인
    if (!mapInstanceRef.current || !window.kakao || !window.kakao.maps) {
      console.log("지도 또는 카카오 맵 객체가 준비되지 않음");
      return;
    }

    console.log("마커 업데이트 시작", markers.length);

    try {
      // 기존 마커 참조 객체
      const currentMarkers = markersRef.current;
      const map = mapInstanceRef.current;

      // 새로운 마커 참조 객체 생성
      const newMarkers: { [key: number]: any } = {};

      // 마커 생성 및 업데이트
      markers.forEach((markerData) => {
        const { id, lat, lng, name, isOfficial } = markerData;

        if (!lat || !lng) {
          console.warn(`마커 ${id}에 유효한 좌표가 없습니다.`, markerData);
          return;
        }

        // 마커 위치 생성
        const position = new window.kakao.maps.LatLng(lat, lng);

        // 마커 이미지 설정 (공식/개인 마커에 따라 다른 이미지)
        let markerImage;
        if (isOfficial) {
          // 공식 마커용 이미지 (별 모양)
          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          const imageSize = new window.kakao.maps.Size(24, 35);
          markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
        }

        // 기존 마커가 없으면 새로 생성
        if (!currentMarkers[id]) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
            title: name || `마커 ${id}`,
            image: markerImage,
          });

          // 마커 클릭 이벤트 추가
          window.kakao.maps.event.addListener(marker, "click", function () {
            console.log(`마커 클릭됨: ${name || `마커 ${id}`} (ID: ${id})`);
            console.log(`클릭 전 지도 줌 레벨: ${map.getLevel()}`);

            try {
              // 명시적으로 줌 레벨 설정 (중요: 숫자가 작을수록 더 확대됨)
              map.setLevel(3, { animate: true });

              // 중심 이동 후 줌 레벨 로깅
              console.log(`중심 이동 후 지도 줌 레벨: ${map.getLevel()}`);

              // 클릭 이벤트 콜백 호출 전 중심 이동
              map.setCenter(position);

              // 클릭 이벤트 콜백 호출
              onMarkerClick(id);
            } catch (e) {
              console.error("마커 클릭 이벤트 처리 중 오류:", e);
            }
          });

          newMarkers[id] = marker;
          console.log(`새 마커 생성: ${name || `마커 ${id}`}`);
        } else {
          // 기존 마커가 있으면 위치만 업데이트
          currentMarkers[id].setPosition(position);

          // 마커 이미지 업데이트 (필요한 경우)
          if (markerImage) {
            currentMarkers[id].setImage(markerImage);
          }

          // 타이틀 업데이트 (필요한 경우)
          if (name && currentMarkers[id].getTitle() !== name) {
            currentMarkers[id].setTitle(name);
          }

          newMarkers[id] = currentMarkers[id];
          delete currentMarkers[id]; // 처리된 마커는 제거
          console.log(`마커 업데이트: ${name || `마커 ${id}`}`);
        }
      });

      // 남은 마커들 (더 이상 데이터에 없는 마커)은 지도에서 제거
      Object.values(currentMarkers).forEach((marker) => {
        if (marker) {
          marker.setMap(null);
          console.log("사용하지 않는 마커 제거");
        }
      });

      // 마커 참조 업데이트
      markersRef.current = newMarkers;
      console.log("마커 업데이트 완료", Object.keys(newMarkers).length);
    } catch (e) {
      console.error("마커 업데이트 중 오류:", e);
    }
  }, [markers, onMarkerClick]);

  // 선택된 마커 효과
  useEffect(() => {
    if (
      !mapInstanceRef.current ||
      !window.kakao ||
      !window.kakao.maps ||
      selectedMarkerId === null
    ) {
      return;
    }

    console.log(`선택된 마커 ID: ${selectedMarkerId} 처리 시작`);

    try {
      // 선택된 마커 찾기
      const selectedMarker = markers.find(
        (marker) => marker.id === selectedMarkerId
      );

      if (selectedMarker) {
        const position = new window.kakao.maps.LatLng(
          selectedMarker.lat,
          selectedMarker.lng
        );
        const map = mapInstanceRef.current;

        console.log(`선택 전 지도 줌 레벨: ${map.getLevel()}`);

        // 줌 레벨 설정 (더 가깝게 보기 위해)
        // 중요: 숫자가 작을수록 더 확대됨 (1-14 범위)
        map.setLevel(3, { animate: true });

        // 지도 중심을 선택된 마커 위치로 부드럽게 이동
        map.panTo(position);

        console.log(`선택된 마커로 지도 이동 후 줌 레벨: ${map.getLevel()}`);
        console.log(
          `선택된 마커로 지도 이동: ${
            selectedMarker.name || `마커 ${selectedMarker.id}`
          }`
        );
      } else {
        console.warn(`선택된 마커 ID ${selectedMarkerId}를 찾을 수 없습니다.`);
      }
    } catch (e) {
      console.error("선택된 마커 처리 중 오류:", e);
    }
  }, [selectedMarkerId, markers]);

  // 윈도우 리사이즈 대응을 위한 이벤트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        const map = mapInstanceRef.current;
        console.log("리사이즈 전 줌 레벨:", map.getLevel());

        map.relayout();

        // 레이아웃 재설정 후 줌 레벨 유지를 위한 명시적 설정
        const currentLevel = map.getLevel();
        if (currentLevel !== 3) {
          map.setLevel(3);
        }

        console.log("윈도우 크기 변경으로 지도 레이아웃 재설정");
        console.log("리사이즈 후 줌 레벨:", map.getLevel());
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
