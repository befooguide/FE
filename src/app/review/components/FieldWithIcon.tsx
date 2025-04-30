"use client";

import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

interface FieldWithIconProps {
  type: string;
  onLikeChange?: (liked: boolean) => void;
}

const FieldWithIcon: React.FC<FieldWithIconProps> = ({ type, onLikeChange }) => {
  const [liked, setLiked] = useState(false);
  const theme = useTheme();

  const handleLikeToggle = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onLikeChange) onLikeChange(newLiked);
  };

  return (
    <Container>
      {type === "receipt" && (
        <img src="/icons/clipboardAdd.svg" alt="영수증 스캔하기" width="24" height="24" />
      )}

      {type === "like" && (
        <LikeIcon
          $color={liked ? theme.colors.primary : "#ccc"}
          onClick={handleLikeToggle}
        />
      )}
    </Container>
  );
};

export default FieldWithIcon;

const Container = styled.div`
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

const LikeIcon = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: ${(props) => props.$color};
  mask: url("/icons/like.svg") no-repeat center;
  -webkit-mask: url("/icons/like.svg") no-repeat center;
  mask-size: contain;
  -webkit-mask-size: contain;
  transition: background-color 0.2s ease;
`;
