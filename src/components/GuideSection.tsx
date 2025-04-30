"use client";

import React from "react";
import GuideCard from "./GuideCard";
import styled from "styled-components";
import Chip from "./Chip";
import { useRouter } from "next/navigation";

interface GuideSectionProps {
  guidePart: string;
  showAllButton?: boolean;
  guides: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 23px;
  font-weight: 700;
  padding: 4px 8px;
  margin-left: 1rem;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  gap: 12px;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  height: 23rem;
  scrollbar-width: none;
  white-space: nowrap;
  overscroll-behavior-x: contain;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
`;
export default function GuideSection({
  guidePart,
  showAllButton = true,
  guides,
}: GuideSectionProps) {
  const router = useRouter();

  const handleShowAllClick = () => {
    if (guidePart === "공식 가이드") {
      router.push("/guide/official");
    } else if (guidePart === "사용자 가이드") {
      router.push("/guide/user");
    }
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{guidePart}</SectionTitle>
        {showAllButton && (
          <Chip text="전체보기" onClick={handleShowAllClick}></Chip>
        )}
      </SectionHeader>
      <CardsContainer>
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            imageUrl={guide.imageUrl}
          />
        ))}
      </CardsContainer>
    </SectionContainer>
  );
}
