"use client";

import React from "react";
import styled from "styled-components";
import PrevPage from "@/components/PrevPage";
import GuideAllCard from "@/components/GuideAllCard";
import testImg from "../../../../public/images/testImg.png";
import { useRouter } from "next/navigation";

const testImgSrc = testImg.src;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  // min-width: 100vw;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font weight medium
  margin: 0 1rem ;
`;

const GuideGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
`;

const Chip = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ selected }) => (selected ? "#00C897" : "#f2f2f2")};
  color: ${({ selected }) => (selected ? "white" : "#888")};
  border: none;
  border-radius: 9999px;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default function OfficialGuidePage() {
  const router = useRouter();

  const handlePrevPageClick = () => {
    router.back();
  };

  // 가이드 카드 클릭 시 해당 가이드 상세 페이지로 이동하는 함수
  const handleGuideClick = (guideId: string) => {
    router.push(`/guide/official/${guideId}`);
  };

  const [regionFilter, setRegionFilter] = React.useState<string | null>(null);
  const [healthFilter, setHealthFilter] = React.useState<string | null>(null);

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

  return (
    <PageContainer>
      <PrevPage text="둘러보기" onClick={handlePrevPageClick} />
      <Title>공식 가이드 모아보기</Title>
      <ChipContainer>
        <Chip
          selected={regionFilter === "서울"}
          onClick={() =>
            setRegionFilter(regionFilter === "서울" ? null : "서울")
          }
        >
          지역 선택
        </Chip>
        <Chip
          selected={healthFilter === "운동"}
          onClick={() =>
            setHealthFilter(healthFilter === "운동" ? null : "운동")
          }
        >
          건강 필터
        </Chip>
      </ChipContainer>
      <GuideGrid>
        {officialGuides.map((guide) => (
          <GuideAllCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            imageUrl={guide.imageUrl}
            onClick={() => handleGuideClick(guide.id)} // 클릭 이벤트 추가
          />
        ))}
      </GuideGrid>
    </PageContainer>
  );
}
