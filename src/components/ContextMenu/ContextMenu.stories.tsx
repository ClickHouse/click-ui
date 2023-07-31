import { ContextMenuProps } from "@radix-ui/react-context-menu";
import { ContextMenu } from "./ContextMenu";
import styled from "styled-components";

interface Props extends ContextMenuProps {
  disabled?: boolean;
  showArrow?: boolean;
  side: "top" | "right" | "left" | "bottom";
}
const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Trigger = styled(GridCenter)`
  border: 2px currentColor dashed;
`;
const ContextMenuExample = ({ showArrow, disabled, side, ...props }: Props) => {
  return (
    <GridCenter>
      <ContextMenu {...props}>
        <ContextMenu.Trigger disabled={disabled}>
          <Trigger>ContextMenu Trigger</Trigger>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          showArrow={showArrow}
          side={side}
        >
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item>Content1 long text content</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
            <ContextMenu.Content sub>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Sub>
          <ContextMenu.Item>Content2</ContextMenu.Item>
          <ContextMenu.Item disabled>Content3</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </GridCenter>
  );
};
export default {
  component: ContextMenuExample,
  title: "Display/ContextMenu",
  tags: ["form-field", "dropdown", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    showArrow: { control: "boolean" },
    side: { control: "select", options: ["top", "right", "left", "bottom"] },
  },
};

export const Playground = {
  args: {
    showArrow: true,
    side: "left",
  },
};
