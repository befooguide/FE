"use client"

import Chip from "@/components/Chip"
import React from "react"
import styled from "styled-components"
import { theme } from "@/styles/theme"
import CustomRow from "@/components/CustomRow"
import CustomColumn from "@/components/CustomColumn"


export default function AllergicList() {

  return (
    <CustomColumn $alignitems="flex-start" $gap="0.8rem" $margin="1.1rem 0 0 0">
      <CustomRow>
        <Chip text="유제품" width="4rem" />
        <Chip text="계란" width="3.5rem" />
        <Chip text="밀" width="1.875rem" />
        <Chip text="땅콩/견과류" width="5rem" />
        <Chip text="해산물" width="4rem" />
        </CustomRow>
        <CustomRow>
        <Chip text="닭고기" width="4rem" />
        <Chip text="소고기" width="4rem" />
        <Chip text="돼지고기" width="5rem" />
        </CustomRow>
    </CustomColumn>
  )

}