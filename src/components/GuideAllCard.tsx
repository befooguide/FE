"use client";

import React, { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import styled from "styled-components";
import Image from "next/image";
import { StaticImageData } from "next/image";
import testImg from "../../public/images/testImg.png";

interface GuideCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  onClick?: () => void; // 클릭 이벤트 핸들러 추가
}

const CardContainer = styled.div`
  position: relative;
  border-radius: 16px;
  width: 335px;
  height: 440px;
  flex: 0 0 auto;
  display: inline-block;
  overflow: hidden;
  cursor: pointer; // 클릭 가능함을 나타내는 커서 스타일 추가
`;

const BookmarkButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10; // 북마크 버튼이 상위 레이어에 표시되도록 설정
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
`;

const CardTitle = styled.h3`
  color: white;
  font-weight: 700;
  font-size: 25px;
  margin: 0.5rem 0.5rem 0 0.5rem;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  margin: 0.5rem 0 0.5rem 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImage = styled(Image)`
  border-radius: 16px;
  object-fit: cover;
`;

export default function GuideAllCard({
  title,
  description,
  imageUrl,
  onClick, // onClick prop 추가
}: GuideCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsBookmarked(!isBookmarked);
  };

  return (
    <CardContainer onClick={onClick}>
      <StyledImage
        src={imageUrl || testImg}
        alt={title}
        width={335}
        height={440}
      />
      <BookmarkButton onClick={toggleBookmark}>
        {isBookmarked ? (
          <FaBookmark color="white" size={30} />
        ) : (
          <FaRegBookmark color="white" size={30} />
        )}
      </BookmarkButton>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardContainer>
  );
}
