// 마이 페이지
"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import InfoArea from "./components/InfoArea";
import CustomColumn from "@/components/CustomColumn";
import List from "./components/List";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";


export default function MyPage() {
  const router = useRouter();
  const { user, checkLoginStatus } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const isLoggedIn = await checkLoginStatus();
      if (!isLoggedIn) {
        router.push('/mypage/login');
      } else if (user?.health_conditions.length === 0) {
        router.replace("/mypage/health");
      }
    };

    if (hasMounted) {
      verifyLoginStatus();
    }
  }, [user, router, hasMounted, checkLoginStatus]);

  // SSR에서는 아무 것도 렌더링하지 않음
  if (!hasMounted) return null;

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
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem 5.05rem 1.5rem;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const Delete = styled.div`
  width: 4rem;
  text-align: center;
  color: ${(props) => props.theme.colors.neutralLight};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border-bottom: 2px solid ${(props) => props.theme.colors.neutralLight};
`;
