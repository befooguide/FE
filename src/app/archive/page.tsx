"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation"; // router import 추가

import RestaurantListCard, {
  RestaurantData,
} from "@/components/RestaurantListCard";
import Image from "next/image";
import testImg from "../../../public/images/testImg.png";
import GuideSection from "@/components/GuideSection";
import GuideAllCard from "@/components/GuideAllCard";

const testImgSrc = testImg.src;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 0rem;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem;
`;

// 새로운 스타일 컴포넌트 추가
const SelectedTabsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #01523b;
  color: white;
  border-radius: 9999px;
  // padding: 0.25rem;
  overflow: hidden;
  color: white;
`;

const MainTabHighlight = styled.div`
  background-color: #00c897;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
`;

const CategoryLabel = styled.div`
  color: white;
  font-weight: 700;
  padding: 0.1rem 1rem;
  font-size: 0.9rem;
  margin-right: 0.3rem;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyMessage = styled.div`
  color: #888;
  text-align: center;
  font-size: 1rem;
`;

//렌더링 컨텐츠 스타일
const RestaurantListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px 16px;
`;
const GuideGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

interface ChipProps {
  $selected: boolean;
}

const Chip = styled.button<ChipProps>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.$selected ? "#00C897" : "#f2f2f2")};
  color: ${(props) => (props.$selected ? "white" : "#888")};
  border: none;
  border-radius: 9999px;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default function Archive() {
  const router = useRouter(); // router 초기화 추가
  const [selectedMainTab, setSelectedMainTab] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const restaurants: RestaurantData[] = [
    {
      id: "1",
      name: "식당 이름",
      address: "서울특별시 강남구 광평로 어쩌구",
      contact: "010-1234-5678",
      isOfficialRecommended: true,
      isMyRecommended: true,
      isBookmarked: true,
    },
    {
      id: "2",
      name: "다른 식당",
      address: "서울특별시 강남구 테헤란로 어쩌구",
      contact: "010-9876-5432",
      isOfficialRecommended: true,
      isMyRecommended: false,
      isBookmarked: false,
    },
  ];
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const toggleBookmark = (restaurantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  };

  const officialGuides = [
    {
      id: "1",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "2",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "3",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
  ];

  const userGuides = [
    {
      id: "3",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
    {
      id: "4",
      title: "가이드 이름",
      description: "가이드 소개가 들어갈 간단한 한 줄 설명...",
      imageUrl: testImgSrc,
    },
  ];

  const handleReset = () => {
    setSelectedMainTab("");
    setSelectedCategory("");
  };

  const handleMainTabClick = (tab: string) => {
    if (selectedMainTab === tab) {
      setSelectedMainTab("");
      setSelectedCategory("");
    } else {
      setSelectedMainTab(tab);
      setSelectedCategory("");
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleGuideClick = (guideId: string) => {
    router.push(`/guide/official/${guideId}`);
  };

  // 내용 렌더링
  const renderContent = () => {
    // 주석 처리된 이전 코드 제거 (가독성을 위해)
    if (!selectedMainTab) {
      return <EmptyMessage>확인할 목록을 선택해주세요</EmptyMessage>;
    }

    if (!selectedCategory) {
      return <EmptyMessage>카테고리를 선택해주세요</EmptyMessage>;
    }

    if (selectedMainTab === "저장 목록") {
      if (selectedCategory === "식당") {
        return (
          <RestaurantListContainer>
            {restaurants.map((restaurant) => (
              <RestaurantListCard
                key={restaurant.id}
                restaurant={{
                  ...restaurant,
                  isBookmarked:
                    bookmarks[restaurant.id] ?? restaurant.isBookmarked,
                }}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </RestaurantListContainer>
        );
      }

      if (selectedCategory === "가이드") {
        return (
          <>
            <GuideSection guidePart="공식 가이드" guides={officialGuides} />
            <GuideSection guidePart="사용자 가이드" guides={userGuides} />
          </>
        );
      }
    }

    if (selectedMainTab === "나만의 목록") {
      if (selectedCategory === "가이드") {
        return (
          <GuideGrid>
            {officialGuides.map((guide) => (
              <GuideAllCard
                key={guide.id}
                title={guide.title}
                description={guide.description}
                imageUrl={guide.imageUrl}
                onClick={() => handleGuideClick(guide.id)}
              />
            ))}
          </GuideGrid>
        );
      }

      if (selectedCategory === "추천 식당") {
        return (
          <RestaurantListContainer>
            {restaurants.map((restaurant) => (
              <RestaurantListCard
                key={restaurant.id}
                restaurant={{
                  ...restaurant,
                  isBookmarked:
                    bookmarks[restaurant.id] ?? restaurant.isBookmarked,
                }}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </RestaurantListContainer>
        );
      }
    }

    // 혹시라도 조건에 해당 안 되면
    return <EmptyMessage>내용이 없습니다</EmptyMessage>;
  }; // 여기서 renderContent 함수가 끝남 (중괄호 하나 제거됨)

  // ChipContainer의 내용을 렌더링하는 함수
  const renderChipContainer = () => {
    // 두 가지 모두 선택된 경우 - 토글 느낌 ui 보여주기
    if (selectedMainTab && selectedCategory) {
      return (
        <SelectedTabsContainer>
          <MainTabHighlight>{selectedMainTab}</MainTabHighlight>
          <CategoryLabel>{selectedCategory}</CategoryLabel>
        </SelectedTabsContainer>
      );
    }

    // 메인 탭만 선택된 경우 - 카테고리 선택 UI 표시
    if (selectedMainTab) {
      return (
        <>
          <Chip
            $selected={true}
            onClick={() => handleMainTabClick(selectedMainTab)}
          >
            {selectedMainTab}
          </Chip>

          {selectedMainTab === "저장 목록" && (
            <>
              <Chip
                $selected={selectedCategory === "식당"}
                onClick={() => handleCategoryClick("식당")}
              >
                식당
              </Chip>
              <Chip
                $selected={selectedCategory === "가이드"}
                onClick={() => handleCategoryClick("가이드")}
              >
                가이드
              </Chip>
            </>
          )}

          {selectedMainTab === "나만의 목록" && (
            <>
              <Chip
                $selected={selectedCategory === "가이드"}
                onClick={() => handleCategoryClick("가이드")}
              >
                가이드
              </Chip>
              <Chip
                $selected={selectedCategory === "추천 식당"}
                onClick={() => handleCategoryClick("추천 식당")}
              >
                추천 식당
              </Chip>
            </>
          )}
        </>
      );
    }

    // 아무것도 선택되지 않은 경우 - 기본 UI 표시
    return (
      <>
        <Chip
          $selected={selectedMainTab === "저장 목록"}
          onClick={() => handleMainTabClick("저장 목록")}
        >
          저장 목록
        </Chip>
        <Chip
          $selected={selectedMainTab === "나만의 목록"}
          onClick={() => handleMainTabClick("나만의 목록")}
        >
          나만의 목록
        </Chip>
      </>
    );
  };

  return (
    <PageContainer>
      <HeaderContainer>
        {(selectedMainTab || selectedCategory) && (
          <CloseButton onClick={handleReset}>
            <IoCloseCircleSharp color="#555555" size={30} />
          </CloseButton>
        )}
        <ChipContainer>{renderChipContainer()}</ChipContainer>
      </HeaderContainer>
      <ContentContainer>{renderContent()}</ContentContainer>
    </PageContainer>
  );
}
