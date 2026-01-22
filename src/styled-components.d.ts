import type StyledComponent from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    typography: {
      styles: Record<string, any>;
    };
    click: Record<string, any>;
    [key: string]: any;
  }
  export const styled: typeof StyledComponent;
}
