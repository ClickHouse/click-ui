import { CodeThemeType } from "./CodeBlock";
import { useCUITheme } from "@/theme/ClickUIProvider";

const useColorStyle = (themeOverride?: CodeThemeType) => {
  const { resolvedTheme, theme } = useCUITheme();

  // Use theme override if provided, otherwise use resolved theme from context
  const themeName = themeOverride ?? (resolvedTheme === "dark" ? "dark" : "light");

  // Get theme-specific colors
  const bgColor =
    themeName === "dark"
      ? theme.click.codeblock.darkMode.color.background.default
      : theme.click.codeblock.lightMode.color.background.default;
  const textColor =
    themeName === "dark"
      ? theme.click.codeblock.darkMode.color.text.default
      : theme.click.codeblock.lightMode.color.text.default;

  return {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: `${theme.click.codeblock.space.y} ${theme.click.codeblock.space.x}`,
      color: textColor,
      background: bgColor,
      borderRadius: theme.click.codeblock.radii.all,
      font: theme.click.codeblock.typography.text.default,
    },
    "hljs-comment": {
      color: themeName === "dark" ? "#999999" : "#656e77",
    },
    "hljs-keyword": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-selector-tag": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-meta-keyword": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-doctag": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-section": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-selector-class": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-meta": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-selector-pseudo": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-attr": {
      color: themeName === "dark" ? "#88aece" : "#015692",
    },
    "hljs-attribute": {
      color: themeName === "dark" ? "#c59bc1" : "#803378",
    },
    "hljs-name": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-type": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-number": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-selector-id": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-quote": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-template-tag": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-built_in": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-title": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-literal": {
      color: themeName === "dark" ? "#f08d49" : "#b75501",
    },
    "hljs-string": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-regexp": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-symbol": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-variable": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-template-variable": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-link": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-selector-attr": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-meta-string": {
      color: themeName === "dark" ? "#b5bd68" : "#54790d",
    },
    "hljs-bullet": {
      color: themeName === "dark" ? "#cccccc" : "#535a60",
    },
    "hljs-code": {
      color: themeName === "dark" ? "#cccccc" : "#535a60",
    },
    "hljs-deletion": {
      color: themeName === "dark" ? "#de7176" : "#c02d2e",
    },
    "hljs-addition": {
      color: themeName === "dark" ? "#76c490" : "#2f6f44",
    },
    "hljs-emphasis": {
      fontStyle: "italic",
    },
    "hljs-strong": {
      fontWeight: "bold",
    },
  };
};

export default useColorStyle;
