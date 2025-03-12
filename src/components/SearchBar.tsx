"use client";

import React from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";
import logoImg from "../../public/logoImg.png";
import Image from "next/image";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 9999px;
  padding: 8px 16px;
  margin: 12px 16px;
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

export default function SearchBar() {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="지역, 식당 검색하기" />
      <IoIosSearch size={18} color="gray" />
    </SearchContainer>
  );
}
