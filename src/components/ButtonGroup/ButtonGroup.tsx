import styled from "styled-components";

export interface ButtonGroupProps {
  labels: string[];
  activeIndex?: number;
  onClick?: (index: number) => void;
}

export const ButtonGroup = ({
  labels,
  activeIndex,
  onClick,
}: ButtonGroupProps) => {
  const btns = labels.map((label, index) => {
    let position: ButtonPosition =
      index === 0 ? "left" : index === labels.length - 1 ? "right" : "center";
    return (
      <Button
        key={index}
        active={index === activeIndex}
        position={position}
        onClick={() => onClick?.(index)}
      >
        {label}
      </Button>
    );
  });
  return <ButtonGroupWrapper>{btns}</ButtonGroupWrapper>;
};

type ButtonPosition = "left" | "center" | "right";
interface ButtonProps {
  active: boolean;
  position: ButtonPosition;
}

const ButtonGroupWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 1px;
  border: var(--click-button-group-color-stroke-panel);
  background: var(--click-button-group-color-background-panel);
`;

const endRadii = "var(--click-button-button-group-radii-end)";
const leftBorderRadius = `${endRadii} 0px 0px ${endRadii}`;
const rightBorderRadius = `0px ${endRadii} ${endRadii} 0px`;
const centerBorderRadius = "var(--click-button-button-group-radii-center)";

const Button = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: var(--click-button-basic-space-y) var(--click-button-basic-space-x);
  gap: 10px;

  background: ${({ active }: ButtonProps) =>
    active
      ? "var(--click-button-group-color-background-active)"
      : "var(--click-button-group-color-background-default)"};

  border-radius: ${({ position }: ButtonProps) =>
    position === "left"
      ? leftBorderRadius
      : position === "right"
      ? rightBorderRadius
      : centerBorderRadius};

  &:hover {
    background: var(--click-button-group-color-background-hover);
  }
`;
