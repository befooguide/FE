// 식당 평가 페이지

"use client"

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import ChipWithLabel from "@/components/ChipWithLabel";
import FieldWithIcon from "../components/FieldWithIcon";
import CustomColumn from "@/components/CustomColumn";
import Textarea from "@/components/Textarea";
import StarWithLabel from "../components/StarWithLabel";
import Button from "@/components/Button";


export default function Review() {
  return (
      <Container>
        <Title>다녀온 식당을 평가해주세요</Title>
        <CustomColumn $gap="1.55rem">
          <ChipWithLabel num="1" text="영수증 인증하기" width="1.875rem">
            <FieldWithIcon type="receipt" />
          </ChipWithLabel>
          <ChipWithLabel num="2" text="별점 평가하기" width="1.875rem">
            <StarWithLabel
              texts={['맛', '메뉴 폭', '영양성분 고지', '건강고민 해결', '총 평점']}
              count={5}
            />
          </ChipWithLabel>
          <ChipWithLabel num="3" text="코멘트 남기기" width="1.875rem">
            <Textarea />
          </ChipWithLabel>
          <ChipWithLabel num="선택" text="식당 추천하기" width="2.5rem">
            <FieldWithIcon type="like" />
            <Text>식당 추천 시, 식당 정보를 가이드 생성에 활용할 수 있습니다.</Text>
          </ChipWithLabel>
        </CustomColumn>
        <div style={{marginTop: "4.5rem"}}><Button text="평가 저장하기" /></div>
      </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem 5.05rem 1.5rem;
`

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 1.5rem;
`

const Text = styled.div`
  margin-top: 0.19rem;
  color: ${(props) => props.theme.colors.neutral};
  font-size: ${(props) => props.theme.fontSizes.small};
`