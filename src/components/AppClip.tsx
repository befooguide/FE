// src/components/AppClip.tsx

import React from "react";
import styled from "styled-components";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

interface AppClipProps {
  title: string;
  isOfficial: boolean;
  isPersonal: boolean;
  location: string;
  time: string;
  isBookmarked: boolean;
  onBookmark: () => void;
  onClose: () => void;
  isEvaluated: boolean;
  onEvaluate: () => void;
}

const Card = styled.div`
  width: 340px;
  height: 190px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0px 80px 2px rgba(0, 0, 0, 0.08);
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
//   position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  word-break: keep-all;
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 20px;
  padding: 4px 14px;
`;

const BookmarkBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 18px;
  right: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 24px;
  cursor: pointer;
`;

const Info = styled.div`
  font-size: 16px;
  color: #000;
  margin-bottom: 4px;
`;

const EvaluateBtn = styled.button`
  background: #ebebf5;
  color: #000;
  font-size: 15px;
  font-weight: 600;
  border-radius: 20px;
  padding: 4px 14px;
  border: none;
  position: absolute;
  bottom: 18px;
  right: 18px;
  cursor: pointer;
`;

const AppClip: React.FC<AppClipProps> = ({
  title,
  isOfficial,
  isPersonal,
  location,
  time,
  isBookmarked,
  onBookmark,
  onClose,
  isEvaluated,
  onEvaluate,
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <TagWrap>
        {isOfficial && <Tag color="#29DE97">공식 추천</Tag>}
        {isPersonal && <Tag color="#E6FFF3" style={{ color: "#29DE97" }}>내 추천</Tag>}
      </TagWrap>
      <BookmarkBtn onClick={onBookmark}>
        {isBookmarked ? (
          <FaBookmark size={26} color="#29DE97" />
        ) : (
          <FaRegBookmark size={26} color="#29DE97" />
        )}
      </BookmarkBtn>
      <CloseBtn onClick={onClose}><IoCloseCircle /></CloseBtn>
      <Info>{location}</Info>
      <Info>{time}</Info>
      <EvaluateBtn onClick={onEvaluate}>
        {isEvaluated ? "내 평가" : "평가하기"}
      </EvaluateBtn>
    </Card>
  );
};

export default AppClip;