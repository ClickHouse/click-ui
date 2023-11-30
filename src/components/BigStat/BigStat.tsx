import styled from "styled-components";

export type bigStatOrder = "titleTop" | "titleBottom";
export type bigStatSize = "sm" | "lg";
export type bigStatSpacing = "sm" | "lg";
export type bigStatState = "default" | "muted";

export interface BigStatProps {
  label: React.ReactNode;
  title: React.ReactNode;
  height?: string;
  order?: bigStatOrder;
  size?: bigStatSize;
  spacing?: bigStatSpacing;
  state?: bigStatState;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  label = "Label",
  title = "Title",
  height = "6rem",
  order = "titleTop",
  size,
  spacing = "sm",
  state = "default",
}: BigStatProps) => (
  <Wrapper
    $height={height}
    $order={order}
    $size={size}
    $spacing={spacing}
    $state={state}
  >
    <Label
      $state={state}
      $size={size}
    >
      {label}
    </Label>
    <Title
      $state={state}
      $size={size}
    >
      {title}
    </Title>
  </Wrapper>
);

const Wrapper = styled.div<{
  $height?: string;
  $order?: bigStatOrder;
  $size?: bigStatSize;
  $spacing?: bigStatSpacing;
  $state?: bigStatState;
}>`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  ${({
    $state = "default",
    $size = "lg",
    $height = "fixed",
    $order,
    $spacing = "sm",
    theme,
  }) => `
    background-color: ${theme.click.bigStat.color.background[$state]};
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
    border-radius: ${theme.click.bigStat.radii.all};
    border: ${theme.click.bigStat.stroke} solid ${
    theme.click.bigStat.color.stroke[$state]
  };
  gap: ${theme.click.bigStat.space[$spacing].gap};
  padding: ${theme.click.bigStat.space.all};
  min-height: ${$height !== undefined ? `${$height}` : "auto"};
  flex-direction: ${$order === "titleBottom" ? "column-reverse" : "column"};
  `}
`;

const Label = styled.div<{
  $state?: bigStatState;
  $size?: bigStatSize;
}>`
  ${({ $state = "default", $size = "lg", theme }) => `
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label.default};
  `}
`;

const Title = styled.div<{
  $state?: bigStatState;
  $size?: bigStatSize;
}>`
  ${({ $state = "default", $size = "lg", theme }) => `
    color: ${theme.click.bigStat.color.title[$state]};
    font: ${theme.click.bigStat.typography[$size].title[$state]};
  `}
`;
