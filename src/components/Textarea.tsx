"use client"

import React from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";

interface TextareaProps {
	$height?: string;
}

const Textarea: React.FC<TextareaProps> = ({ $height }) => {
  return (
    <Container $height={$height} />
  );
};

export default Textarea;

const Container = styled.textarea<TextareaProps>`
  display: flex;
  width: 21.1875rem;
  height: ${(props) => props.$height || '9.25rem'};
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: none;
  background-color: ${(props) => props.theme.colors.neutralLight};
  resize: none;

  &:focus {
    outline: none;
  }

`