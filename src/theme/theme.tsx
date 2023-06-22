import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeName, themes } from ".";

const ThemeProvider = ({
  theme: name,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => (
  <StyledThemeProvider theme={themes[name]}>{children}</StyledThemeProvider>
);

export { ThemeProvider };
