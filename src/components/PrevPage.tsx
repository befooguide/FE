"use client";

import React from "react";
import styled from "styled-components";

interface PrevPageProps {
  text: string;
}

const PrevPage: React.FC<PrevPageProps> = ({ text }) => {
  return (
    <PrevPageContainer>
      <img src="/icons/prevPage.svg" alt="이전 페이지" width={16} height={16} />
      <Text>{text}</Text>
    </PrevPageContainer>
  );
};
  
export default PrevPage;


const PrevPageContainer = styled.div`
  display: inline-flex;
  padding: 0.6875rem 0.5rem;
  margin-bottom: 0.5rem ;
  align-items: center;
  gap: 0.1875rem;
`;


const Text = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: -0.02688rem
`;
