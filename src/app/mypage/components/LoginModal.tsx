"use client"

import React, { useEffect } from "react"
import styled from "styled-components"
import Button from "@/components/Button"
import CustomColumn from "@/components/CustomColumn"
import useAuthStore from "@/store/authStore"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginModal() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/api/login/kakao`;
  };

  // 로그인 성공 시 홈으로 리다이렉션
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

   // 에러 표시를 위한 효과
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        clearError();
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [error, clearError]);

  return(
    <Container>
      <CustomColumn $gap="2.81rem" $alignitems="flex-start" $margin="0 0 4rem 0">
        <Title>로그인 후 더 많은 기능을 <br/> 활용하실 수 있습니다.</Title>
        <SubTitle>로그아웃 시 기능이 제한됩니다.</SubTitle>
      </CustomColumn>
      <Button text="카카오로 로그인하기" $backgroundcolor="#FEE500" color="#191600" icon="/icons/kakao.svg" onClick={handleKakaoLogin}/>
      {error && <p className="error-message">{error}</p>}
    </Container>
  )

}


const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 25.125rem;
  height: 30.1875rem;
  padding: 2.25rem 2.75rem 19.75rem 1.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.8125rem;
  flex-shrink: 0;
  border-radius: 2.125rem;
  background: #FFF;
  box-shadow: 0px 4px 80px 0px rgba(0, 0, 0, 0.20);
`

const Title = styled.div`
  color: #000;
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.125rem; 
`

const SubTitle = styled.div`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`

