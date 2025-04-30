"use client";

import React from "react";
import SearchBar from "@/components/SearchBar";
import GuideSection from "@/components/GuideSection";
import testImg from "../../../public/images/testImg.png";
import logoImg from "../../../public/logoImg.png";
import Image from "next/image";
import styled from "styled-components";

const testImgSrc = testImg.src;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

export default function Home() {
  const officialGuides = [
    {
      id: "1",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "2",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "3",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
  ];

  const userGuides = [
    {
      id: "3",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "4",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
  ];

  return (
    <div>
      <HeaderBar>
        <Image src={logoImg} alt="logo" width={50} />
        <SearchBar /> {/* 초기값 필요 없음 */}
      </HeaderBar>

      <GuideSection guidePart="공식 가이드" guides={officialGuides} />
      <GuideSection guidePart="사용자 가이드" guides={userGuides} />
    </div>
  );
}
