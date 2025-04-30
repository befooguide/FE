"use client";

import React from "react";
import styled from "styled-components";

interface ChipProps {
  text: string;
  color?: string;
  backgroundcolor?: string;
  width?: string;
  border?: string;
  onClick?: () => void;
}


const Chip: React.FC<ChipProps> = ({ text, color, backgroundcolor, width, border, onClick }) => {
  return (
    <ChipContainer backgroundcolor={backgroundcolor} width={width} border={border} onClick={onClick}>

      <Text color={color}>{text}</Text>
    </ChipContainer>
  );
};

export default Chip;




const ChipContainer = styled.div<{backgroundcolor?: string, width?: string, border?: string}>`

  display: flex;
  width: ${(props) => props.width || "4.5625rem"};
  height: 1.875rem;
  justify-content: center;
  align-items: center;
  padding: 0.4375rem 0.5625rem;
  gap: 0.625rem;
  border-radius: 6.25rem;

  border: ${(props) => props.border || 'none'};
  background-color: ${(props) => props.backgroundcolor || props.theme.colors.neutralLight};

`;

const Text = styled.span<{ color?: string }>`
  color: ${(props) => props.color || props.theme.colors.neutral};
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "SF Pro", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
`;
