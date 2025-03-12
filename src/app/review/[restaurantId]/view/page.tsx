// 식당 평가 확인 페이지

"use client"

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import CustomColumn from "@/components/CustomColumn";
import StarWithLabel from "../../components/StarWithLabel";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import RestaurantCard from "@/components/RestaurantCard";


export default function Review() {
  return (
    <Container>
      <Title>식당 이름에 대한 내 평가</Title>
      <CustomColumn $gap="1.55rem">
        <StarWithLabel
          texts={['맛', '메뉴 폭', '영양성분 고지', '건강고민 해결', '총 평점']}
          count={5}
          chipColor={theme.colors.neutral}
          chipBackgroundColor={theme.colors.neutralLight}
          chipBorder="none"
          margin="0.25rem 0"
        />
        <CustomColumn $gap="0.75rem">
          <Chip text="코멘트" />
          <Comment>맛은 있는데.. 예.. 저와 함께 가실 수는 없겠네요.. <br />
          아 디자인 보여줘야해서 배지는 드리겠습니다. </Comment>
        </CustomColumn>
        <RestaurantCard name="식당 이름" location="위치" time="영업 시간"/>
      </CustomColumn>
      <div style={{ marginTop: "4.5rem" }}>
        <Button text="평가 수정하기" backgroundColor={theme.colors.primary} color="#ffffff"/>
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
