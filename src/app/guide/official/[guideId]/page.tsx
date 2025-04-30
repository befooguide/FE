"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import PrevPage from "@/components/PrevPage";
import { VscChecklist } from "react-icons/vsc";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Image from "next/image";
import testImg from "../../../../../public/images/testImg.png";

const testImgSrc = testImg.src;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const TitleSection = styled.div`
  padding: 0 16px;
`;

const GuideTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 4px;
`;

const AuthorText = styled.p`
  font-size: 0.8rem;
  color: #666666;
  margin: 0;
`;

const DetailIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ChecklistButton = styled.div`
  cursor: pointer;
`;

const BookmarkButton = styled.div`
  z-index: 10;
`;

const ContentContainer = styled.div`
  flex: 0;
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 540px;
  margin-top: 16px;
  overflow: hidden; /* 추가: 넘치는 이미지 숨기기 */
  touch-action: pan-y;
`;

const ImagesWrapper = styled.div<{ currentPage: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${({ currentPage }) => `translateX(-${currentPage * 100}%)`};
  transition: transform 0.5s ease; /* 추가: 부드럽게 넘어가기 */
`;

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #ffffff;
`;

const CaptionTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 8px 0;
`;

const CaptionText = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 16px 0;
`;

const IndicatorDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#000000" : "#dddddd")};
  cursor: pointer;
`;

const GuideInfoSection = styled.div`
  padding: 16px;
  border-top: 1px solid #eeeeee;
`;

const GuideInfoText = styled.p`
  white-space: pre-wrap;
  font-size: 15px;
  font-weight: bold;
  color: #444444;
  margin: 0;
`;

export default function GuideDetailPage({
  params,
}: {
  params: { guideId: string };
}) {
  const router = useRouter();
  const handlePrevPageClick = () => {
    router.back();
  };
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsBookmarked(!isBookmarked);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const guideData = {
    id: params.guideId,
    title: "가이드명이 또 너무 길면 어떡하지",
    author: "username",
    images: [
      {
        src: testImgSrc,
        caption: "식당 이름 1",
        description: "첫 번째 사진 설명입니다.",
      },
      {
        src: testImgSrc,
        caption: "식당 이름 2",
        description: "두 번째 사진 설명입니다.",
      },
      {
        src: testImgSrc,
        caption: "식당 이름 3",
        description: "세 번째 사진 설명입니다.",
      },
      {
        src: testImgSrc,
        caption: "식당 이름 4",
        description: "네 번째 사진 설명입니다.",
      },
      {
        src: testImgSrc,
        caption: "식당 이름 5",
        description: "다섯 번째 사진 설명입니다.",
      },
    ],
    info: "가이드 설명입니다\n칼국수 맛집 모음집...",
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentPage((prev) => Math.min(prev + 1, guideData.images.length - 1)),
    onSwipedRight: () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  const handleChecklistClick = () => {
    router.push(`/guide/official/${params.guideId}/list`);
  };

  return (
    <PageContainer>
      <PrevPage text="전체보기" onClick={handlePrevPageClick} />
      <DetailCardContainer>
        <HeaderContainer>
          <TitleSection>
            <GuideTitle>{guideData.title}</GuideTitle>
            <AuthorText>by. {guideData.author}</AuthorText>
          </TitleSection>
          <DetailIcons>
            <ChecklistButton onClick={handleChecklistClick}>
              <VscChecklist size={30} />
            </ChecklistButton>
            <BookmarkButton onClick={toggleBookmark}>
              {isBookmarked ? (
                <FaBookmark color="black" size={30} />
              ) : (
                <FaRegBookmark color="black" size={30} />
              )}
            </BookmarkButton>
          </DetailIcons>
        </HeaderContainer>

        <ContentContainer>
          <ImageSection {...handlers}>
            <ImagesWrapper currentPage={currentPage}>
              {guideData.images.map((image, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {idx === currentPage && (
                    <CaptionOverlay>
                      <CaptionTitle>{image.caption}</CaptionTitle>
                      <CaptionText>{image.description}</CaptionText>
                    </CaptionOverlay>
                  )}
                </div>
              ))}
            </ImagesWrapper>
          </ImageSection>

          <PageIndicator>
            {guideData.images.map((_, index) => (
              <IndicatorDot
                key={index}
                active={index === currentPage}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </PageIndicator>

          <GuideInfoSection>
            <GuideInfoText>{guideData.info}</GuideInfoText>
          </GuideInfoSection>
        </ContentContainer>
      </DetailCardContainer>
    </PageContainer>
  );
}
