"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Chip from "@/components/Chip";
import CustomRow from "@/components/CustomRow";


interface StarWithLabelProps {
  texts: string[];
  count: number;
  chipBorder?: string;
  chipColor?: string;
  chipBackgroundColor?: string;
  margin?: string;
}

const StarWithLabel: React.FC<StarWithLabelProps> = ({ 
  texts, 
  count,
  chipBorder = "1px solid #DEDEDE",
  chipColor = theme.colors.neutral,
  chipBackgroundColor = "#Ffffff", 
  margin = "0",
}) => {
  const renderStarChips = () => {
    const starItems = [];
    for (let i = 0; i < count; i++) {
      starItems.push(
        <CustomRow $justifycontent='space-between' $width='95%' $margin={margin}>
          <Chip
            text={texts[i]}
            width="auto"
            color={chipColor} 
            backgroundColor={chipBackgroundColor} 
            border={chipBorder} 
          />
          <StarContainer>
            <CustomRow $gap="0.25rem">
              {Array(5)
                .fill(
                  <img
                    src="/icons/star.svg"
                    alt="별점 평가하기"
                    width="35"
                    height="35"
                  />
                )
                .map((star, index) => (
                  <div key={index}>{star}</div>
                ))}
            </CustomRow>
          </StarContainer>
        </CustomRow>
      );
    }
    return starItems;
  };

  return <Container>{renderStarChips()}</Container>;
};

export default StarWithLabel;

const Container = styled.div<{ backgroundColor?: string, width?: string }>`
  display: flex;
  flex-direction: column;
  width: 21.1875rem;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
`;

const StarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

