"use client";

import React from "react";
import styled from "styled-components";

interface FieldWithIconProps {
  type: string;
  color?: string;
}

const FieldWithIcon: React.FC<FieldWithIconProps> = ({ type, color }) => {
  return (
    <Container>
      {type === "receipt" && (
      <img src="/icons/clipboardAdd.svg" alt="영수증 스캔하기" width="24" height="24" /> )}
            {type === "like" && (
      <img src="/icons/like.svg" alt="식당 추천하기" width="24" height="24" /> )}
    </Container>
  );
};

export default FieldWithIcon;


const Container = styled.div<{backgroundcolor?: string, width?: string}>`
  display: flex;
  width: 21.1875rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;

  border-radius: 0.625rem;
  border: 1px solid #DEDEDE;
`;
