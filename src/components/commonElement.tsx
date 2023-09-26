import styled, { css } from "styled-components";
import { IconSize } from "./Icon/types";

export const FormRoot = styled.div<{
  $orientation?: "horizontal" | "vertical";
  $dir?: "start" | "end";
}>`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.click.field.space.gap};
  ${({ theme, $orientation = "vertical", $dir = "start" }) => `
    flex-direction: ${
      $orientation === "horizontal"
        ? $dir === "start"
          ? "row-reverse"
          : "row"
        : $dir === "start"
        ? "column-reverse"
        : "column"
    };
    align-items: flex-start;
    label {
      padding-top: ${
        $orientation === "horizontal" ? `calc(${theme.click.field.space.y} + 1px)` : 0
      };
      ${$orientation === "horizontal" ? "line-height: 1lh;" : ""}
    }
  `}
  * {
    box-shadow: none;
    outline: none;
  }
`;

export const Error = styled.div`
  ${({ theme }) => `
  font: ${theme.click.field.typography.label.error};
  color: ${theme.click.field.color.label.error};
`};
`;

export const ItemSeparator = css`
  height: 1px;
  background-color: ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

export const EmptyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  border: 0;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

export const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    border-radius: ${theme.click.button.radii.all};
    gap: ${theme.click.button.basic.space.gap};
    font: ${theme.click.button.basic.typography.label.default};
    &:hover {
      font: ${theme.click.button.basic.typography.label.hover};
    }

    &:active,
    &:focus {
      outline: none;
      font: ${theme.click.button.basic.typography.label.active};
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:active {
      font: ${theme.click.button.basic.typography.label.disabled};
      cursor: not-allowed;
    }
    `}
`;

export const SvgImageElement = styled.svg<{
  $size?: IconSize;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $size }) => `
    & svg {
      ${
        $size
          ? `
        width: ${theme.click.image[$size].size.width};
        height: ${theme.click.image[$size].size.height};
      `
          : ""
      }
    }
  `}
`;

export const FormElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  gap: ${({ theme }) => theme.click.field.space.gap};
`;

export const EllipsisContainer = styled.span`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: flex-end;
  gap: inherit;
  & > *:not(button) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
