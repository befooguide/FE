"use client";

import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import styled from "styled-components";
import Image from "next/image";
import { StaticImageData } from "next/image";
import testImg from "../../public/images/testImg.png";

interface GuideCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
}

const CardContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
  width: 160px;
  height: 240px;
`;

const BookmarkButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
`;

const CardTitle = styled.h3`
  color: white;
  font-weight: 700;
  font-size: 18px;
  margin: 0;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin: 4px 0 0 0;
`;

export default function GuideCard({
  title,
  description,
  imageUrl,
}: GuideCardProps) {
  return (
    <CardContainer>
      <Image src={imageUrl || testImg} alt={title} width={160} height={240} />
      <BookmarkButton>
        <FaRegBookmark color="white" size={20} />
      </BookmarkButton>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardContainer>
  );
}
