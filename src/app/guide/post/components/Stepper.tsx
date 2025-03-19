// "use client"

// import React from "react";
// import styled from "styled-components";
// import { theme } from "@/styles/theme";

// const Stepper = () => {

//   return (
//     <Container>
//       <img src="/icons/decrement.svg" alt="삭제하기" />
//       <Divider />
//       <img src="/icons/increment.svg" alt="추가하기" />
//     </Container>
//   );
// };

// export default Stepper;

// const Container = styled.div`
// display: flex;
// flex-direction: row;
// width: 5.875rem;
// height: 2rem;
// padding: 0 0.875rem;
// justify-content: center;
// align-items: center;

// gap: 0.90625rem;
// flex-shrink: 0;
// border-radius: 0.5rem;
// background: var(--Fills-Tertiary, rgba(120, 120, 128, 0.12));
// `;


// const Divider = styled.div`
//   width: 0.0625rem;
//   height: 1.125rem;
//   flex-shrink: 0;
//   border-radius: 0.5rem;
//   background: var(--Labels-Tertiary, rgba(60, 60, 67, 0.30));
//   /* Center the divider vertically in the container */
// `;

"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface StepperProps {
  addPlace: () => void;
  removePlace: () => void;
}

const Stepper: React.FC<StepperProps> = ({ addPlace, removePlace }) => {
  return (
    <Container>
      <Img src="/icons/decrement.svg" alt="삭제하기" onClick={removePlace} />
      <Divider />
      <Img src="/icons/increment.svg" alt="추가하기" onClick={addPlace} />
    </Container>
  );
};

export default Stepper;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 5.875rem;
  height: 2rem;
  padding: 0 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.90625rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--Fills-Tertiary, rgba(120, 120, 128, 0.12));
`;

const Img = styled.img`
  cursor: pointer;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 1.125rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--Labels-Tertiary, rgba(60, 60, 67, 0.30));
`;
