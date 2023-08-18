import styled from "styled-components";

export type bigStatState = "default";
export type bigStatSize = "sm" | "lg";

export interface BigStatProps {
  label: React.ReactNode;
  title: React.ReactNode;
  state?: bigStatState;
  size?: bigStatSize;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  label = "Label",
  title = "Title",
  size,
  state,
}: BigStatProps) => (
  <Wrapper
    $state={state}
    $size={size}
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
}>`
  display: flex;
  ${({ $state = "default", $size = "lg", theme }) => `
    background-color: ${theme.click.bigStat.color.background[$state]};
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
    border-radius: ${theme.click.bigStat.radii.all};
    border: ${theme.click.bigStat.stroke} solid ${
    theme.click.bigStat.color.stroke[$state]
  };
    gap: ${theme.click.bigStat.space.gap};
    padding: ${theme.click.bigStat.space.all};
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
