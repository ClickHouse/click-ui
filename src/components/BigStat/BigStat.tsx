import styled from "styled-components";

export type bigStatState = "default";
export type bigStatSize = "sm" | "lg";
export type bigStatHeight = "fixed" | "fluid";

export interface BigStatProps {
  label: React.ReactNode;
  title: React.ReactNode;
  height?: string;
  state?: bigStatState;
  size?: bigStatSize;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  label = "Label",
  title = "Title",
  height = "6rem",
  size,
  state,
}: BigStatProps) => (
  <Wrapper
    $state={state}
    $size={size}
    $height={height}
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
  $state?: bigStatState;
  $size?: bigStatSize;
  $height?: number;
}>`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  ${({ $state = "default", $size = "lg", $height = "fixed", theme }) => `
    background-color: ${theme.click.bigStat.color.background[$state]};
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
    border-radius: ${theme.click.bigStat.radii.all};
    border: ${theme.click.bigStat.stroke} solid ${
    theme.click.bigStat.color.stroke[$state]
  };
    gap: ${theme.click.bigStat.space.gap};
    padding: ${$height === "fixed" ? `0 ${theme.click.bigStat.space.all}` : theme.click.bigStat.space.all};
    min-height: ${$height !== undefined ? `${$height}` : "auto"};
    flex-direction: ${$size === "sm" ? "column-reverse" : "column"};
  `}
`;

const Label = styled.div<{
  $state?: bigStatState;
  $size?: bigStatSize;
}>`
  ${({ $state = "default", $size = "lg", theme }) => `
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
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
