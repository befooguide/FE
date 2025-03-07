"use client";

import React from "react";
import styled from "styled-components";

interface ChipProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
}

const Chip: React.FC<ChipProps> = ({ text, color, backgroundColor, width }) => {
  return (
    <ChipContainer backgroundColor={backgroundColor} width={width}>
      <Text color={color}>{text}</Text>
    </ChipContainer>
  );
};

export default Chip;


const ChipContainer = styled.div<{backgroundColor?: string, width?: string}>`
  display: flex;
  width: ${(props) => props.color || '4.5625rem'};
  height: 1.875rem;
  padding: 0.4375rem 0.6875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 6.25rem;
  background-color: ${(props) => props.backgroundColor || props.theme.colors.neutralLight};
`;


const Text = styled.span<{color?: string}>`
  color: ${(props) => props.color || props.theme.colors.neutral};
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "SF Pro", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-style: normal;
  font-weight: 590;
  line-height: 1rem;
`;
