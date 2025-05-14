// components/BottomSheet.tsx
"use client";
import React from "react";
import styled from "styled-components";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const Sheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 50%;
  bottom: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  transform: translateX(-50%);
  width: 100%;
  max-width: 402px;
  height: 50%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 24px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
  transition: bottom 0.3s ease-in-out;
  z-index: 1000;
`;

const Title = styled.h2`
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 33px;
  font-weight: 600;
  line-height: 50px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 24px 0px;
`;

const ConfirmButton = styled.button`
  background-color: #4ade80;
  color: white;
  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 9999px;
  font-size: 16px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      <Sheet isOpen={isOpen}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>
          위치 정보 접근 허용이
          <br /> 필요합니다.
        </Title>
        <Description>미허용 시 기능 일부가 제한됩니다.</Description>
        <ConfirmButton onClick={onConfirm}>권한 설정하기</ConfirmButton>
      </Sheet>
    </>
  );
};

export default BottomSheet;
