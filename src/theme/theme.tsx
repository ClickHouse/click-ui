import { themes } from "@/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
const ThemeProvider = ({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) => (
  <StyledThemeProvider theme={themes[theme]}>{children}</StyledThemeProvider>
);

export { ThemeProvider };
