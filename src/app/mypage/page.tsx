// 마이 페이지
"use client"

import React from "react";
import styled from "styled-components";
import NavBar from "@/components/Navbar";
import LoginModal from "./components/LoginModal";


export default function MyPage() {
  return (
    <div>
      로고
      <LoginModal />
      <NavBar />
    </div>
  )
}

