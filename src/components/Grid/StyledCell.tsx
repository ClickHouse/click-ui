import styled from "styled-components";
import { RoundedType, SelectionType } from "./types";

export const StyledCell = styled.div<{
  $isFocused: boolean;
  $selectionType: SelectionType;
  $isSelectedTop: boolean;
  $isSelectedLeft: boolean;
  $isLastRow: boolean;
  $isLastColumn: boolean;
  $isFirstRow: boolean;
  $isFirstColumn: boolean;
  $rounded: RoundedType;
  $height: number;
  $type?: "body" | "header";
}>`
  display: block;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
  ${({
    theme,
    $isFocused,
    $isLastRow,
    $isLastColumn,
    $selectionType,
    $isFirstRow,
    $isFirstColumn,
    $rounded,
    $height,
    $type = "body",
  }) => `
    height: ${$height}px;
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
    border: 1px solid ${theme.click.grid[$type].cell.color.stroke[$selectionType]};
    ${
      $isFocused
        ? `box-shadow: inset 0 0 0 1px ${theme.click.grid[$type].cell.color.stroke.selectDirect};`
        : ""
    }
    ${
      $isLastRow
        ? `
        border-bottom-color: ${theme.click.grid[$type].cell.color.stroke[$selectionType]};
    `
        : "border-bottom: none;"
    }
    ${
      $isLastColumn
        ? `
        border-right-color: ${theme.click.grid[$type].cell.color.stroke[$selectionType]};
    `
        : "border-bottom: none;"
    }
    ${
      $isFirstRow || $isLastRow
        ? `
    ${
      $isFirstColumn
        ? `border-${$isFirstRow ? "top" : "bottom"}-left-radius: ${
            theme.click.grid.radii[$rounded]
          };`
        : ""
    }
    ${
      $isLastColumn
        ? `border-${$isFirstRow ? "top" : "bottom"}-right-radius: ${
            theme.click.grid.radii[$rounded]
          };`
        : ""
    }
    `
        : ""
    }
  `}
`;
