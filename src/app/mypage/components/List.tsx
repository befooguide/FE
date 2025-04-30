"use client"

import React from "react"
import styled from "styled-components"
import CustomRow from "@/components/CustomRow"


export default function List() {

  return (
    <Container>
      <CustomRow $margin="0 1.3rem" $gap="1.8rem">
        <img src="/icons/list.svg" alt="list" />
        <Title>내가 평가한 식당</Title>
      </CustomRow>
    </Container>
  )

}


const Container = styled.div`
  display: flex;
  width: 21.1875rem;
  height: 4.8125rem;
  margin: 1rem 0;
  border: 2px solid ${(props) => props.theme.colors.neutralLight};
  border-radius: 0.7rem;
`

const Title = styled.div`
  display: flex;
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 120% */
`