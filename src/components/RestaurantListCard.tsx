"use client";

import React from "react";
import styled from "styled-components";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const CardContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  width: 360px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const NameAndTags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const RestaurantName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: black;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.div<{ filled: boolean; color: string }>`
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: ${({ filled, color }) => (filled ? color : "white")};
  color: ${({ filled, color }) => (filled ? "white" : color)};
  border: 1px solid ${({ color }) => color};
  white-space: nowrap;
`;

const BookmarkButton = styled.div`
  cursor: pointer;
`;

const Address = styled.p`
  font-size: 15px;
  color: black;
  margin: 0;
`;

const Contact = styled.p`
  font-size: 15px;
  color: black;
  margin: 0;
`;

export interface RestaurantData {
  id: string;
  name: string;
  address: string;
  contact?: string;
  isOfficialRecommended: boolean;
  isMyRecommended: boolean;
  isBookmarked?: boolean;
}

interface RestaurantListCardProps {
  restaurant: RestaurantData;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

const RestaurantListCard: React.FC<RestaurantListCardProps> = ({
  restaurant,
  onToggleBookmark,
}) => {
  return (
    <CardContainer>
      <TopRow>
        <NameAndTags>
          <RestaurantName>{restaurant.name}</RestaurantName>

          <TagRow>
            <Tag color="#29DE97" filled={restaurant.isOfficialRecommended}>
              공식 추천
            </Tag>
            <Tag color="#29DE97" filled={restaurant.isMyRecommended}>
              내 추천
            </Tag>
          </TagRow>
        </NameAndTags>

        <BookmarkButton onClick={(e) => onToggleBookmark(restaurant.id, e)}>
          {restaurant.isBookmarked ? (
            <FaBookmark size={26} color="#29DE97" />
          ) : (
            <FaRegBookmark size={26} color="#29DE97" />
          )}
        </BookmarkButton>
      </TopRow>

      <Address>{restaurant.address}</Address>
      <Contact>{restaurant.contact}</Contact>
    </CardContainer>
  );
};

export default RestaurantListCard;
