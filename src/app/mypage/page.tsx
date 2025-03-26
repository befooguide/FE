// 마이 페이지
"use client"

import React from "react";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import InfoArea from "./components/InfoArea";
import CustomColumn from "@/components/CustomColumn";
import List from "./components/List";

export default function MyPage() {
  return (
    <div>
      <Container>
        <CustomColumn $gap="2.6rem">
          <div>
            <Title>내 정보</Title>
            <InfoArea />
            <Delete>회원 탈퇴</Delete>
          </div>
          <div>
            <Title>모아보기</Title>
            <List />
          </div>
        </CustomColumn>
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
`

const Delete = styled.div`
  width: 4rem;
  text-align: center;
  color: ${(props) => props.theme.colors.neutralLight};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border-bottom: 2px solid ${(props) => props.theme.colors.neutralLight};
`