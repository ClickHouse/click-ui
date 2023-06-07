import { ThemeProvider } from "styled-components";
import { themes } from "@/theme";

export const render = (...props: unknown[]) => (
  <ThemeProvider theme={themes.dark} {...props} />
);
