"use client";

import React, { useState } from "react";
import KakaoMap from "../../components/KakaoMap/KakaoMap";
import SearchBar from "@/components/SearchBar";
import AppClip from "@/components/AppClip";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

const MapPageContainer = styled.div`
  width: 100%;
  height: 93vh;
  position: relative;
  overflow: hidden;
`;

const SearchSection = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const StyledSearchBar = styled.div`
  width: 23rem;
`;

const FilterContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterButton = styled.button`
  flex-shrink: 0;
  background-color: #e0f7e9;
  color: #17c964;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
`;

const AppClipWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  width: fit-content;
`;

export default function Map() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const filters = [
    "내 주변",
    "건강 필터",
    "한식",
    "양식",
    "일식",
    "중식",
    "분식",
    "카페",
  ];
  const markerData = [
    {
      id: 1,
      name: "서울 시청",
      location: "서울특별시 중구 태평로1가",
      time: "09:00 - 18:00",
      lat: 37.5665,
      lng: 126.978,
      isOfficial: true,
      isPersonal: false,
    },
    {
      id: 2,
      name: "부산 해운대",
      location: "부산광역시 해운대구 우동",
      time: "24시간",
      lat: 35.1587,
      lng: 129.1604,
      isOfficial: true,
      isPersonal: false,
    },
    {
      id: 3,
      name: "제주 올레길",
      location: "제주특별자치도 서귀포시",
      time: "24시간",
      lat: 33.450701,
      lng: 126.570667,
      isOfficial: true,
      isPersonal: false,
    },
    {
      id: 4,
      name: "강남 스타일",
      location: "서울특별시 강남구",
      time: "24시간",
      lat: 37.5172,
      lng: 127.0473,
      isOfficial: false,
      isPersonal: true,
    },
    {
      id: 5,
      name: "인천 차이나타운",
      location: "인천광역시 중구",
      time: "10:00 - 22:00",
      lat: 37.4738,
      lng: 126.6217,
      isOfficial: true,
      isPersonal: false,
    },
  ];
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [isBookmarked, setBookmarked] = useState(false);
  const [isEvaluated, setEvaluated] = useState(false);

  const selectedMarker = markerData.find(
    (marker) => marker.id === selectedMarkerId
  );

  return (
    <MapPageContainer>
      <SearchSection>
        <StyledSearchBar>
          <SearchBar initialValue={query} />
        </StyledSearchBar>

        <FilterContainer>
          {filters.map((filter, index) => (
            <FilterButton key={index}>{filter}</FilterButton>
          ))}
        </FilterContainer>
      </SearchSection>

      <KakaoMap
        markers={markerData}
        selectedMarkerId={selectedMarkerId}
        onMarkerClick={(id) => setSelectedMarkerId(id)}
      />

      {selectedMarker && (
        <AppClipWrapper>
          <AppClip
            title={selectedMarker.name}
            isOfficial={selectedMarker.isOfficial}
            isPersonal={selectedMarker.isPersonal}
            location={selectedMarker.location}
            time={selectedMarker.time}
            isBookmarked={isBookmarked}
            onBookmark={() => setBookmarked(!isBookmarked)}
            onClose={() => setSelectedMarkerId(null)}
            isEvaluated={isEvaluated}
            onEvaluate={() => setEvaluated(!isEvaluated)}
          />
        </AppClipWrapper>
      )}
    </MapPageContainer>
  );
}
