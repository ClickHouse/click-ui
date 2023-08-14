import { Theme } from "@/styles/types";
import { useTheme } from "styled-components";
interface NameTheme extends Theme {
  name?: "light" | "dark" | "classic";
}
const useColorStyle = (defaultTheme?: "light" | "dark") => {
  const { name, ...theme }: NameTheme = useTheme();

  const codeTheme =
    theme.click.codeblock[
      `${
        !defaultTheme ? (name !== "classic" ? name ?? "light" : "light") : defaultTheme
      }Mode`
    ].color;
  console.log({
    codeTheme,
    a: defaultTheme && defaultTheme !== "dark" ? "light" : defaultTheme ?? name,
    defaultTheme,
    name,
  });
  return {
    hljs: {
      display: "block",
      overflowX: "auto",
      padding: `${theme.click.codeblock.space.y} ${theme.click.codeblock.space.x}`,
      color: codeTheme.text.default,
      background: codeTheme.background.default,
      borderRadius: theme.click.codeblock.radii.all,
    },
    "hljs-comment": {
      color: "#408080",
      fontStyle: "italic",
    },
    "hljs-quote": {
      color: "#408080",
      fontStyle: "italic",
    },
    "hljs-keyword": {
      color: "#954121",
    },
    "hljs-selector-tag": {
      color: "#954121",
    },
    "hljs-literal": {
      color: "#954121",
    },
    "hljs-subst": {
      color: "#954121",
    },
    "hljs-number": {
      color: "#40a070",
    },
    "hljs-string": {
      color: "#219161",
    },
    "hljs-doctag": {
      color: "#219161",
    },
    "hljs-selector-id": {
      color: "#19469d",
    },
    "hljs-selector-class": {
      color: "#19469d",
    },
    "hljs-section": {
      color: "#19469d",
    },
    "hljs-type": {
      color: "#19469d",
    },
    "hljs-params": {
      color: "#00f",
    },
    "hljs-title": {
      color: "#458",
      fontWeight: "bold",
    },
    "hljs-tag": {
      color: "#000080",
      fontWeight: "normal",
    },
    "hljs-name": {
      color: "#000080",
      fontWeight: "normal",
    },
    "hljs-attribute": {
      color: "#000080",
      fontWeight: "normal",
    },
    "hljs-variable": {
      color: "#008080",
    },
    "hljs-template-variable": {
      color: "#008080",
    },
    "hljs-regexp": {
      color: "#b68",
    },
    "hljs-link": {
      color: "#b68",
    },
    "hljs-symbol": {
      color: "#990073",
    },
    "hljs-bullet": {
      color: "#990073",
    },
    "hljs-built_in": {
      color: "#0086b3",
    },
    "hljs-builtin-name": {
      color: "#0086b3",
    },
    "hljs-meta": {
      color: "#999",
      fontWeight: "bold",
    },
    "hljs-deletion": {
      background: "#fdd",
    },
    "hljs-addition": {
      background: "#dfd",
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
