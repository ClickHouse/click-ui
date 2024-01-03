import { Children, ReactNode, isValidElement } from "react";

export const getTextFromNodes = (node: ReactNode): string => {
  if (node === null) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromNodes).join(" ");
  }

  if (isValidElement(node)) {
    const children = Children.toArray(node.props.children);
    return children.map(getTextFromNodes).join(" ");
  }

  return "";
};
