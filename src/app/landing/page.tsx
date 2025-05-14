"use client";
import React, { useState } from "react";
import NavBar from "@/components/Navbar";
import BottomSheet from "@/components/Bottomsheet";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-top: 200px;
`;

export default function LandingPage() {
  const [showSheet, setShowSheet] = useState(true);

  return (
    <div>
      <Logo>로고</Logo>
      <BottomSheet isOpen={showSheet} onClose={() => setShowSheet(false)} />
      <NavBar />
    </div>
  );
}
