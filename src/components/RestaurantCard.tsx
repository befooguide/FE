"use client";

import React from "react";
import styled from "styled-components";
import Chip from "./Chip";
import { theme } from "@/styles/theme";
import CustomRow from "./CustomRow";


interface RestaurantCardProps {
  name: string;
  location: string;
  time: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, location, time }) => {
  return (
    <RestaurantCardContainer>
      <CustomRow $gap="0.94rem" $margin="0 0 1rem 0" $justifycontent="flex-start">
      <Title>{name}</Title>
      <Chip text="공식 추천" color="#ffffff" backgroundColor={theme.colors.primary} />
      </CustomRow>
      <Sub>{location}</Sub>
      <Sub>{time}</Sub>
    </RestaurantCardContainer>
  );
};
  
export default RestaurantCard;


const RestaurantCardContainer = styled.div`
  width: 21.25rem;
  height: 11.875rem;
  padding: 1.44rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 80px 2px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.neutralLight};
`;


const Title = styled.div`
  color: ${(props) => props.theme.colors.neutralDark};
  font-size: ${(props) => props.theme.fontSizes.large};
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
`;

const Sub = styled.div`
  margin: 0.3rem 0;
  color: ${(props) => props.theme.colors.neutralDark};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`;