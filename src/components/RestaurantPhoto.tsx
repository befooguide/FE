"use client"

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const RestaurantPhoto = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <Container onClick={() => document.getElementById("fileInput")?.click()}>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      
      {imageSrc ? (
        <Image src={imageSrc} alt="Restaurant" />
      ) : (
        <PlaceholderText>사진 추가하기</PlaceholderText>
      )}
    </Container>
  );
};

export default RestaurantPhoto;

const Container = styled.div`
  display: flex;
  width: 21.1875rem;
  height: 18.0625rem;
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: none;
  background-color: ${(props) => props.theme.colors.neutralLight};
  resize: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  border-radius: 0.625rem;
`;

const PlaceholderText = styled.span`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.neutralDark};
  text-align: center;
  font-weight: bold;
`;
