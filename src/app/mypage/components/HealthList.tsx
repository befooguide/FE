"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import CustomRow from "@/components/CustomRow";
import CustomColumn from "@/components/CustomColumn";

export default function HealthList() {
  const diseases = [
    "당뇨",
    "고혈압",
    "고지혈증",
    "심장병",
    "위염・위장장애",
    "신장 질환",
    "간 질환",
    "암",
    "골다공증",
    "소화기 질환",
  ];

  return (
    <Container>
      <CustomColumn>
        {diseases.map((disease, index) => (
            <CustomRow $justifycontent="space-between" key={index}>
              <Name>{disease}</Name>
              <img src="/icons/checkmark.svg" alt="check" />
            </CustomRow>
        ))}
      </CustomColumn>
    </Container>
  );
}

const Container = styled.div`
  width: 21.25rem;
  height: auto;
  flex-shrink: 0;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.625rem;
  background: #f5f5f5;
`;

const Name = styled.div`
  font-size: 1rem;
`;
