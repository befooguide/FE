// 건강 정보 등록 페이지

"use client"

import React from "react";
import styled from "styled-components";
import ChipWithLabel from "@/components/ChipWithLabel";
import CustomColumn from "@/components/CustomColumn";
import Button from "@/components/Button";
import AllergicList from "../components/AllergicList";
import HealthList from "../components/HealthList";
import Navbar from "@/components/Navbar";
import Textarea from "@/components/Textarea";
import CustomRow from "@/components/CustomRow";


export default function Health() {
  return (
    <div>
      <Container>
        <Title>정보를 등록해주세요</Title>
        <CustomColumn $gap="1.55rem" $alignitems="flex-start">
          <ChipWithLabel num="1" text="닉네임 설정하기" width="1.875rem">
          <CustomRow $gap="0.5rem" $alignitems="flex-start">
            <Textarea $height="2.6875rem" $width='16rem'/>
            <Check>중복확인</Check>
            </CustomRow>
          </ChipWithLabel>
          <ChipWithLabel num="2" text="건강 고민 선택하기" width="1.875rem">
            <HealthList />
          </ChipWithLabel>
          <ChipWithLabel num="3" text="알레르기 선택하기" width="1.875rem">
            <AllergicList />
          </ChipWithLabel>
        </CustomColumn>
        <div style={{ marginTop: "4.5rem" }}><Button text="정보 등록하기" /></div>
      </Container>
      <Navbar />
    </div>
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

const Check = styled.button`
    width: 5rem;
    height: 2.6875rem;
    border: none;
    padding: 0.7rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: none;
  background-color: ${(props) => props.theme.colors.neutralLight};
  cursor: pointer;
`