/**
 * @deprecated This module is deprecated. Use the new CSS variable-based tokens instead.
 * Import from '@clickhouse/design-tokens/legacy' only for backward compatibility.
 */

import { CUI_THEME_STORAGE_KEY } from "./localStorage";

export const THEME_ATTRIBUTE = `data-${CUI_THEME_STORAGE_KEY}`;

const getDOMElement = (selector: string) => {
  const el = document.querySelector(selector) as HTMLElement | null;

  if (!el) {
    console.warn(`Missing DOM element <${selector}>!`);
    return null;
  }

  return el;
};

export const getRootElement = () => {
  const el = getDOMElement("html");

  if (!el) {
    return;
  }

  return el;
};
