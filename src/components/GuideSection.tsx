"use client";

import React from "react";
import GuideCard from "./GuideCard";
import styled from "styled-components";
import Chip from "./Chip";

interface GuideSectionProps {
  title: string;
  showAllButton?: boolean;
  guides: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

const SectionContainer = styled.div`
  margin: 24px 0 16px 0;
`;

const SectionHeader = styled.div`
  display: flex;
  //   justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const ViewAllButton = styled.button`
  font-size: 14px;
  color: #6b7280;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 16px;
  padding-left: 16px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
export default function GuideSection({
  title,
  showAllButton = true,
  guides,
}: GuideSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {showAllButton && <Chip text="전체보기"></Chip>}
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
