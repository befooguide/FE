// 이거 써야 theme에 타입이 적용됨
import "styled-components";
import { theme } from "@/styles/theme"; // theme 객체의 타입을 사용

type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
