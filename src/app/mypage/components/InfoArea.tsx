"use client"

import Chip from "@/components/Chip";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";
import authStore from "@/store/authStore";

interface User {
  nickname: string;
  health_conditions: string[];
  allergies: string[];
}

export default function InfoArea() {
  const { user, isLoading, error, checkLoginStatus } = authStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    checkLoginStatus();
  }, [checkLoginStatus]);

  if (!hasMounted || isLoading) return <div>Loading...</div>; 

  return (
    <Container>
      <CustomRow $margin="0 0 1rem 0.5rem" $justifycontent="space-between">
        <Title>{user?.nickname || "닉네임"}</Title>
        <Chip text="로그아웃" color="#ffffff" backgroundcolor={theme.colors.neutral} />
      </CustomRow>
      <Divider />
      <CustomRow $margin="0 0 1rem 0.5rem" $justifycontent="space-between">
        <CustomColumn $margin="0.5rem 0 0 0" $gap="0.5rem" $alignitems="flex-start">
          <div>
            <SubTitle>건강 고민</SubTitle>
            <SubTitleData>{user?.health_conditions?.join(", ") || "정보 없음"}</SubTitleData>
          </div>
          <div>
            <SubTitle>알레르기</SubTitle>
            <SubTitleData>{user?.allergies?.join(", ") || "정보 없음"}</SubTitleData>
          </div>
        </CustomColumn>
        <Chip text="수정" />
      </CustomRow>
      <Divider />
      <CustomRow $margin="0.5rem 0 1rem 0.5rem" $justifycontent="space-between">
        <SubTitle>위치 정보 권한 설정</SubTitle>
        <Chip text="설정" />
      </CustomRow>
    </Container>
  );
}

const Container = styled.div`
  width: 21.25rem;
  height: 14.875rem;
  flex-shrink: 0;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.625rem;
  background: #F5F5F5;
`

const Title = styled.div`
  display: flex;
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 120% */
`

const SubTitle = styled.div`
color: #000;
font-size: 0.9375rem;
font-style: normal;
font-weight: 400;
line-height: 1.5rem;
`

const SubTitleData = styled.div`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
`

const Divider = styled.div`
  width: 19.4375rem;
  height: 0.5px;
  flex-shrink: 0;
  background: #A3A3A3;
`;
