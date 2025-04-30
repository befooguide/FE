// "use client";

// import React from "react";
// import styled from "styled-components";
// import { theme } from "@/styles/theme";
// import Chip from "@/components/Chip";
// import CustomRow from "@/components/CustomRow";


// interface StarWithLabelProps {
//   texts: string[];
//   count: number;
//   chipBorder?: string;
//   chipColor?: string;
//   chipbackgroundColor?: string;
//   margin?: string;
// }

// const StarWithLabel: React.FC<StarWithLabelProps> = ({ 
//   texts, 
//   count,
//   chipBorder = "1px solid #DEDEDE",
//   chipColor = theme.colors.neutral,
//   chipbackgroundColor = "#Ffffff", 
//   margin = "0",
// }) => {
//   const renderStarChips = () => {
//     const starItems = [];
//     for (let i = 0; i < count; i++) {
//       starItems.push(
//         <CustomRow
//           key={`star-row-${i}`}
//           $justifycontent="space-between"
//           $width="95%"
//           $margin={margin}
//         >
//           <Chip
//             text={texts[i]}
//             width="auto"
//             color={chipColor}
//             backgroundcolor={chipbackgroundColor}
//             border={chipBorder}
//           />
//           <StarContainer>
//             <CustomRow $gap="0.25rem">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <div key={`star-${i}-${index}`}>
//                   <img
//                     src="/icons/star.svg"
//                     alt="별점 평가하기"
//                     width="35"
//                     height="35"
//                   />
//                 </div>
//               ))}
//             </CustomRow>
//           </StarContainer>
//         </CustomRow>
//       );
//     }
//     return starItems;
//   };
  

//   return <Container>{renderStarChips()}</Container>;
// };

// export default StarWithLabel;

// const Container = styled.div<{ backgroundcolor?: string, width?: string }>`
//   display: flex;
//   flex-direction: column;
//   width: 21.1875rem;
//   height: auto;
//   justify-content: flex-start;
//   align-items: flex-start;
//   flex-shrink: 0;
// `;

// const StarContainer = styled.div`
//   display: flex;
//   flex-grow: 1;
//   justify-content: flex-end;
// `;


"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Chip from "@/components/Chip";
import CustomRow from "@/components/CustomRow";

interface StarWithLabelProps {
  texts: string[];
  count: number;
  chipBorder?: string;
  chipColor?: string;
  chipbackgroundColor?: string;
  margin?: string;
}

const StarWithLabel: React.FC<StarWithLabelProps> = ({
  texts,
  count,
  chipBorder = "1px solid #DEDEDE",
  chipColor = theme.colors.neutral,
  chipbackgroundColor = "#FFFFFF",
  margin = "0",
}) => {
  // 각 항목별 별점 (기본값: 0)
  const [ratings, setRatings] = useState<number[]>(Array(count).fill(0));

  const handleStarClick = (itemIndex: number, starIndex: number, isHalf: boolean) => {
    const newRatings = [...ratings];
    newRatings[itemIndex] = isHalf ? starIndex + 0.5 : starIndex + 1;
    setRatings(newRatings);
  };

  const renderStars = (itemIndex: number) => {
    const currentRating = ratings[itemIndex];

    return Array.from({ length: 5 }).map((_, starIndex) => {
      let icon = "/icons/star_empty.svg";

      if (currentRating >= starIndex + 1) {
        icon = "/icons/star_full.svg";
      } else if (currentRating >= starIndex + 0.5) {
        icon = "/icons/star_half.svg";
      }

      return (
        <StarWrapper key={`star-${itemIndex}-${starIndex}`}>
          <Half onClick={() => handleStarClick(itemIndex, starIndex, true)} />
          <Full onClick={() => handleStarClick(itemIndex, starIndex, false)} />
          <StarImage src={icon} alt="별점" />
        </StarWrapper>
      );
    });
  };

  return (
    <Container>
      {texts.map((text, i) => (
        <CustomRow
          key={`star-row-${i}`}
          $justifycontent="space-between"
          $width="95%"
          $margin={margin}
        >
          <Chip
            text={text}
            width="auto"
            color={chipColor}
            backgroundcolor={chipbackgroundColor}
            border={chipBorder}
          />
          <StarContainer>
            <CustomRow $gap="0.25rem">{renderStars(i)}</CustomRow>
          </StarContainer>
        </CustomRow>
      ))}
    </Container>
  );
};

export default StarWithLabel;

// 스타일 정의

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 21.1875rem;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
`;

const StarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const StarImage = styled.img`
  width: 35px;
  height: 35px;
  pointer-events: none;
`;

const StarWrapper = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
`;

const Half = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
`;

const Full = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
`;
