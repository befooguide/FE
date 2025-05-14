"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Button from '@/components/Button';
import styled from 'styled-components';

export default function Callback() {
  const router = useRouter();
  const { checkLoginStatus, isLoading, error } = useAuthStore();

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const success = await checkLoginStatus();
        if (!success) {
          router.push('/mypage/login');
        }
      } catch (err) {
        console.error('로그인 상태 확인 중 오류 발생:', err);
        router.push('/mypage/login');
      }
    };

    verifyLogin();
  }, [checkLoginStatus, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <Container>
          <SubTitle>로그인 중</SubTitle>
        </Container>
      ) : error ? (
        <Container>
          <SubTitle>로그인 처리 중 오류가 발생했습니다.</SubTitle>
          <Button
            text="다시 시도하기"
            $backgroundcolor="#FEE500"
            color="#191600"
            onClick={() => router.push('/mypage/login')}
          />
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
`;

const SubTitle = styled.div`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`;
