"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveIcon = (path: string) => pathname?.startsWith(path);

  const handleNavigation = (path: string) => {
    if (path === "/mypage") {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        router.push("/mypage/login");
        return;
      }
    }
    router.push(path);
  };

  return (
    <Nav>
      <IconContainer $active={getActiveIcon("/home")} onClick={() => handleNavigation("/home")}>
        <Image src="/icons/home.svg" alt="Home" width={40} height={40} />
        {getActiveIcon("/home") && <Underline />}
      </IconContainer>

      <IconContainer $active={getActiveIcon("/map")} onClick={() => handleNavigation("/map")}>
        <Image src="/icons/map.svg" alt="Map" width={40} height={40} />
        {getActiveIcon("/map") && <Underline />}
      </IconContainer>

      <IconContainer $active={getActiveIcon("/guide/post")} onClick={() => handleNavigation("/guide/post")}>
        <Image src="/icons/plus.svg" alt="Plus" width={38} height={38} />
      </IconContainer>

      <IconContainer $active={getActiveIcon("/archive")} onClick={() => handleNavigation("/archive")}>
        <Image src="/icons/saved.svg" alt="Saved" width={40} height={40} />
        {getActiveIcon("/archive") && <Underline />}
      </IconContainer>

      <IconContainer $active={getActiveIcon("/mypage")} onClick={() => handleNavigation("/mypage")}>
        <Image src="/icons/user.svg" alt="User" width={17} height={17} />
        {getActiveIcon("/mypage") && <Underline />}
      </IconContainer>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 25.125rem;
  height: 3.75rem;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

interface IconContainerProps {
  $active?: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: ${(props) => (props.$active ? "column" : "row")};
  cursor: pointer;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(5) {
    width: 2.5rem;
    height: 2.5rem;
  }

  &:nth-child(3) {
    width: 2.375rem;
    height: 2.375rem;
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.825rem;
  height: 0rem;
  border-bottom: 3px solid #000;
  flex-shrink: 0;
`;
