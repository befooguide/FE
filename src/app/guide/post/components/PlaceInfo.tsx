"use client"

import React, { useState } from "react";
import styled from "styled-components";
import CustomColumn from "@/components/CustomColumn";
import Chip from "@/components/Chip";
import Stepper from "./Stepper";
import Dropdown from "@/components/Dropdown";
import RestaurantPhoto from "@/components/RestaurantPhoto";
import Textarea from "@/components/Textarea";
import ChipWithLabel from "@/components/ChipWithLabel";
import CustomRow from "@/components/CustomRow";
import { theme } from "@/styles/theme";

interface PlaceInfoProps {
  num: string;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ num }) => {
  // 장소 수 상태 관리
  const [places, setPlaces] = useState<number[]>(Array.from({ length: parseInt(num, 10) }, (_, i) => i + 1));

  // 장소 추가
  const addPlace = () => {
    if (places.length < 5) {
    setPlaces((prevPlaces) => [...prevPlaces, prevPlaces.length + 1]);
    }
  };

  // 장소 삭제
  const removePlace = () => {
    setPlaces((prevPlaces) => prevPlaces.slice(0, prevPlaces.length - 1));
  };

  return (
    <div>
      {places.map((place) => (
        <CustomColumn $gap="1rem" key={place}>
          <Container>
            <CustomRow $justifycontent="space-between" $margin="0.56rem">
              <CustomRow $gap="0.62rem">
                <Chip text={( place +1 ).toString()} width="1.875rem" color={theme.colors.neutral} backgroundColor={theme.colors.neutralLight} />
                <Chip text={`장소 ${place} 선택`} width="6.625rem" color="#ffffff" backgroundColor={theme.colors.primary} />
              </CustomRow>
              <Stepper addPlace={addPlace} removePlace={removePlace} />
            </CustomRow>
            <Dropdown />
          </Container>
          <ChipWithLabel num={( place +1 ).toString()} text={`장소 ${place} 사진`} width="1.875rem">
            <RestaurantPhoto />
          </ChipWithLabel>
          <ChipWithLabel num={( place +1 ).toString()} text={`장소 ${place} 설명`} width="1.875rem">
            <Textarea $height="5.5rem" />
          </ChipWithLabel>
        </CustomColumn>
      ))}
    </div>
  );
};

export default PlaceInfo;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: baseline;
`