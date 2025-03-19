// 가이드 생성 페이지
"use client"

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import CustomColumn from "@/components/CustomColumn";
import Button from "@/components/Button";
import ChipWithLabel from "@/components/ChipWithLabel";
import Textarea from "@/components/Textarea";
import PlaceInfo from "./components/PlaceInfo";

export default function Home() {
  return (
    <Container>
      <Title>나만의 가이드를 공유해주세요</Title>
      <CustomColumn $gap="1.55rem">
        <ChipWithLabel num="1" text="가이드 제목" width="1.875rem">
          <Textarea $height="2.6875rem" />
        </ChipWithLabel>
        <ChipWithLabel num="1" text="가이드 설명" width="1.875rem">
          <Textarea />
        </ChipWithLabel>
        <PlaceInfo num="1"/>
      </CustomColumn>
      <div style={{ marginTop: "4.5rem" }}>
        <Button text="가이드 생성하기" backgroundColor={theme.colors.primary} color="#ffffff" />
      </div>
    </Container>
  )
}



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 1.5rem 5.05rem 1.5rem;
`

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 1.5rem;
`

const Comment = styled.div`
  color: ${(props) => props.theme.colors.neutralDark};
  font-size: ${(props) => props.theme.fontSizes.medium};
`
