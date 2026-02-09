import { ThemeName } from "@/theme";
import { CUI_THEME_STORAGE_KEY } from "./localStorage";

const THEME_ATTRIBUTE = `data-${CUI_THEME_STORAGE_KEY}`;

const getDOMElement = (selector: string) => {
  const el = document.querySelector(selector) as HTMLElement | null;

  if (!el) {
    console.warn(`Missing DOM element <${selector}>!`);
    return null;
  }

  return el;
};

export const setRootThemeAttribute = (theme: ThemeName) => {
  const el = getDOMElement('html');

  if (!el) {
    return;
  }

  el.setAttribute(THEME_ATTRIBUTE, theme);
};

export const removeRootThemeAttribute = () => {
  const el = getDOMElement('html');

  if (!el) {
    return;
  }

  el.removeAttribute(THEME_ATTRIBUTE);
};
