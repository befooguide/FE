"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PrevPage from "@/components/PrevPage";
import RestaurantListCard, {
  RestaurantData,
} from "@/components/RestaurantListCard";

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const PageTitle = styled.h1`
  font-size: 23px;
  font-weight: 500;
  margin: 16px 16px 8px;
`;

const RestaurantListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px 16px;
`;

const GuideRestaurantListPage = ({
  params,
}: {
  params: { guideId: string };
}) => {
  const router = useRouter();

  const handlePrevPageClick = () => {
    router.back();
  };

  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const toggleBookmark = (restaurantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  };

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

  return (
    <PageContainer>
      <PrevPage text="가이드" onClick={handlePrevPageClick} />
      <PageTitle>이 식당들이 포함되어 있어요</PageTitle>

      <RestaurantListContainer>
        {restaurants.map((restaurant) => (
          <RestaurantListCard
            key={restaurant.id}
            restaurant={{
              ...restaurant,
              isBookmarked: bookmarks[restaurant.id] ?? restaurant.isBookmarked,
            }}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </RestaurantListContainer>
    </PageContainer>
  );
};

export default GuideRestaurantListPage;
