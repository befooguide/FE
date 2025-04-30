"use client"

import React, { ReactNode } from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";
import CustomRow from "./CustomRow";
import Chip from "./Chip";


interface ChipWithLabelProps {
  num: string;
  text: string;
  width: string;
  children: React.ReactNode;
}

const ChipWithLabel: React.FC<ChipWithLabelProps> = ({
  num,
  text,
  width,
  children,
}) => {
  return (
    <Container>
      <CustomRow $gap="0.62rem" $margin="0.56rem">
        <Chip text={num} width={width} color={theme.colors.neutral} backgroundcolor={theme.colors.neutralLight}/>
        <Chip text={text} width="7rem" color="#ffffff" backgroundcolor={theme.colors.primary}/>
      </CustomRow>
      {children}
    </Container>
  );
};

export default ChipWithLabel;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: baseline;
`