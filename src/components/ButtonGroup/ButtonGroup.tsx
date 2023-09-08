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
    const position: ButtonPosition =
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
box-sizing: default;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.click.button.group.color.stroke.panel};
  background: ${({ theme }) =>
  theme.click.button.group.color.background.panel};
`;

const endRadii = "var(--click-button-button-group-radii-end)";
const leftBorderRadius = `${endRadii} 0px 0px ${endRadii}`;
const rightBorderRadius = `0px ${endRadii} ${endRadii} 0px`;
const centerBorderRadius = "var(--click-button-button-group-radii-center)";

const Button = styled.button<ButtonProps>`
  box-sizing: default;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${({ theme }) => theme.click.button.group.color.background.default};
  color: ${({ theme }) => theme.click.button.group.color.text.default};
  font: ${({ theme }) => theme.click.button.basic.typography.label.default};
  border-radius: ${({ theme }) => theme.click.button.group.radii};
  padding: ${({ theme }) =>
  theme.click.button.basic.space.y} ${({ theme }) =>
  theme.click.button.basic.space.x};
  gap: ${({ theme }) => theme.click.button.basic.space.group};

  &:hover {
    background: ${({ theme }) => theme.click.button.group.color.background.hover};
  }

  &:active, &:focus {
    background: ${({ theme }) => theme.click.button.group.color.background.active};
  }


  border-radius: ${({ position }: ButtonProps) =>
    position === "left"
      ? leftBorderRadius
      : position === "right"
      ? rightBorderRadius
      : centerBorderRadius};

`;
