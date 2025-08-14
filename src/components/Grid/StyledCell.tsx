import { styled } from "styled-components";
import { SelectionType } from "./types";

export const StyledCell = styled.div<{
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $isFirstRow: boolean;
  $isFirstColumn: boolean;
  $height: number;
  $type?: "body" | "header";
  $showBorder: boolean;
  $rowAutoHeight?: boolean;
}>`
  display: block;
  text-align: left;
  &[data-align="right"] {
    text-align: right;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
  width: 100%;
  box-sizing: border-box;
  ${({
    theme,
    $isFocused,
    $isLastRow,
    $isLastColumn,
    $selectionType,
    $height,
    $type = "body",
    $showBorder,
    $rowAutoHeight,
  }) => `
    height: ${$rowAutoHeight ? "100%" : `${$height}px`};
    min-height: ${$rowAutoHeight ? "auto" : ""};
    overflow-y: ${$rowAutoHeight ? "auto" : ""};
    background: ${theme.click.grid[$type].cell.color.background[$selectionType]};
    color: ${
      $type === "header"
        ? theme.click.grid.header.cell.color.title[$selectionType]
        : theme.click.grid.body.cell.color.text[$selectionType]
    };
    font: ${theme.click.grid.cell.text.default};
    padding: ${theme.click.grid[$type].cell.space.y} ${
      theme.click.grid[$type].cell.space.x
    };
    border: 1px solid ${theme.click.grid[$type].cell.color.stroke.default};
    ${
      $type === "header" && !$showBorder
        ? `
      &[data-grid-row="-1"] {
        border-top: none;
      }
      &[data-grid-column="-1"] {
        border-left: none;
      }
    `
        : ""
    }
    ${
      $isFocused
        ? `box-shadow: inset 0 0 0 1px ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
        : ""
    }
    ${
      $isLastRow
        ? `
        border-bottom-color: ${
          theme.click.grid[$type].cell.color.stroke[
            $isFocused ? "selectDirect" : $selectionType
          ]
        };
    `
        : "border-bottom: none;"
    }
    ${
      $isLastColumn
        ? `
        border-right-color: ${
          theme.click.grid[$type].cell.color.stroke[
            $isFocused ? "selectDirect" : $selectionType
          ]
        };
    `
        : "border-right: none;"
    }
    ${$rowAutoHeight && "border: none;"}
  `}
  ${({
    theme,
    $isLastRow,
    $isLastColumn,
    $selectionType,
    $type = "body",
    $isSelectedTop,
    $isSelectedLeft,
    $rowAutoHeight,
  }) =>
    $isSelectedTop ||
    $isSelectedLeft ||
    ($selectionType === "selectDirect" && ($isLastRow || $isLastColumn)) ||
    $rowAutoHeight
      ? `
          &::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            ${
              $isSelectedTop
                ? `border-top: 1px solid ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
                : ""
            }
            ${
              $isSelectedLeft
                ? `border-left: 1px solid ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
                : ""
            }
            ${
              $selectionType === "selectDirect" && $isLastRow
                ? `border-bottom: 1px solid ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
                : ""
            }
            ${
              $selectionType === "selectDirect" && $isLastColumn
                ? `border-right: 1px solid ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
                : ""
            }
            ${$rowAutoHeight && "border: none;"}
          }
        `
      : ""};
`;
