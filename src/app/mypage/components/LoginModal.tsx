"use client"

import React from "react"
import styled from "styled-components"
import Button from "@/components/Button"
import CustomColumn from "@/components/CustomColumn"

export default function LoginModal() {

  return(
    <Container>
      <CustomColumn $gap="2.81rem" $alignitems="flex-start" $margin="0 0 4rem 0">
        <Title>로그인 후 더 많은 기능을 <br/> 활용하실 수 있습니다.</Title>
        <SubTitle>로그아웃 시 기능이 제한됩니다.</SubTitle>
      </CustomColumn>
      <Button text="카카오로 로그인하기" backgroundColor="#FEE500" color="#191600" icon="/icons/kakao.svg"/>
    </Container>
  )

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
`

const Title = styled.div`
  color: #000;
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.125rem; 
`

const SubTitle = styled.div`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`

