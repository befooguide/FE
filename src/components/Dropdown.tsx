"use client"

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const Dropdown = () => {
  const restaurantNames = [
    "선택하기",
    "식당 1",
    "식당 2",
    "식당 3",
    "식당 4",
    "식당 5"
  ];

  return (
    <Container>
      <Select>
        {restaurantNames.map((name, index) => (
          <Option key={index} value={name}>
            {name}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  display: flex;
  width: 21.1875rem;
  height: 2.5rem;
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: none;
  background-color: ${(props) => props.theme.colors.neutralLight};
  resize: none;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  background-color: ${(props) => props.theme.colors.neutralLight};
  font-size: ${(props) => props.theme.fontSizes.medium};

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const Option = styled.option`
  font-size: ${(props) => props.theme.fontSizes.medium};
  padding: 0.5rem;
`;
