"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Button from '@/components/Button';
import styled from 'styled-components';

// 카카오 로그인 콜백 페이지
// 백엔드에서 리다이렉트된 후 사용자 인증 상태를 확인하는 페이지
// 로그인 성공 시 홈으로 이동, 실패 시 로그인 페이지로 리디렉션
export default function Callback() {
  const router = useRouter();
  const { checkLoginStatus, isAuthenticated, isLoading, error } = useAuthStore();

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const loginSuccess = await checkLoginStatus();

        if (!loginSuccess) {
          router.push('/mypage/login');
        }
      } catch (err) {
        console.error('로그인 상태 확인 중 오류 발생:', err);
        router.push('/mypage/login');
      }
    };

    verifyLogin();
  }, [checkLoginStatus, router]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <Container>
          <SubTitle>로그인 중</SubTitle>
        </Container>
      ) : error ? (
        <Container>
          <SubTitle>로그인 처리 중 오류가 발생했습니다.</SubTitle>
          <Button text="다시 시도하기" backgroundcolor="#FEE500" color="#191600" onClick={() => router.push('/login')} />
        </Container>
      ) : null}
    </div>
  );
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

const SubTitle = styled.div`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`