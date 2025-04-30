"use client";

import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 9999px;
  padding: 8px 16px;
  margin: 12px 16px;
  width: 23rem;
`;

const SearchInput = styled.input`
  margin-left: 8px;
  background-color: transparent;
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
`;

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue); // 초기값이 바뀔 수도 있으니까 반영
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/map?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="지역, 식당 검색하기"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon onClick={handleSearch}>
        <IoIosSearch size={18} color="gray" />
      </SearchIcon>
    </SearchContainer>
  );
}
