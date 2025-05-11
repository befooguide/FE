"use client"

import React, { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import NavBar from "@/components/Navbar";
// import { useRouter } from "next/navigation";
// import useAuthStore from "@/store/authStore";


export default function Login() {

  const [hasMounted, setHasMounted] = useState(false);

  // const router = useRouter();
  // const { checkLoginStatus, isAuthenticated, isLoading } = useAuthStore();


  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // SSR 중에는 아무 것도 렌더링하지 않음
  }

  // 페이지 로드 시 로그인 상태 확인
  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     await checkLoginStatus();
  //   };
    
  //   verifyAuth();
  // }, [checkLoginStatus]);
  
  // 이미 로그인한 사용자는 홈으로 리디렉션
  // useEffect(() => {
  //   if (isAuthenticated && !isLoading) {
  //     router.push('/');
  //   }
  // }, [isAuthenticated, isLoading, router]);
  
  // if (isLoading) {
  //   return (
  //     <div>
  //       <p>로딩 중...</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      로고
      <LoginModal />
      <NavBar />
    </div>
  )
}

