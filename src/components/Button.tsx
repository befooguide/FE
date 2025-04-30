"use client";

import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  color?: string;
  backgroundcolor?: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ text, color, backgroundcolor, icon }) => {
  return (
    <ButtonContainer backgroundcolor={backgroundcolor}>
      {icon && <Icon src={icon} alt="icon" />}
      <Text color={color}>{text}</Text>
    </ButtonContainer>
  );
};
  
export default Button;


const ButtonContainer = styled.div<{backgroundcolor?: string}>`
  display: flex;
  width: 21.375rem;
  height: 3.375rem;
  padding: 0rem 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
  border-radius: 2.125rem;
  background-color: ${(props) => props.backgroundcolor || props.theme.colors.neutralLight};
`;


const Text = styled.span<{color?: string}>`
  color: ${(props) => props.color || props.theme.colors.neutral};;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
`;