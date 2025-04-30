"use client";

import React from "react";
import KakaoMap from "../../components/KakaoMap/KakaoMap";
import SearchBar from "@/components/SearchBar";
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
  // align-items: center;
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

      <KakaoMap />
    </MapPageContainer>
  );
}
