import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
export type bigStatOrder = 'titleTop' | 'titleBottom';
export type bigStatSize = 'sm' | 'lg';
export type bigStatSpacing = 'sm' | 'lg';
export type bigStatState = 'default' | 'muted';

export interface BigStatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the component should fill the full width of its container */
  fillWidth?: boolean;
  /** Maximum width of the component */
  maxWidth?: string;
  /** Height of the component */
  height?: string;
  /** The label text displayed below or above the title */
  label: React.ReactNode;
  /** The order of title and label - titleTop shows title first, titleBottom shows label first */
  order?: bigStatOrder;
  /** The size variant of the component */
  size?: bigStatSize;
  /** The spacing between title and label */
  spacing?: bigStatSpacing;
  /** The visual state of the component */
  state?: bigStatState;
  /** The main title/value to display */
  title: React.ReactNode;
  /** Whether to show an error state with danger border */
  error?: boolean;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  fillWidth = false,
  maxWidth,
  height = '6rem',
  label = 'Label',
  order = 'titleTop',
  size,
  spacing = 'sm',
  state = 'default',
  title = 'Title',
  error = false,
  ...props
}: BigStatProps) => (
  <Wrapper
    $height={height}
    $order={order}
    $size={size}
    $spacing={spacing}
    $state={state}
    $fillWidth={fillWidth}
    $maxWidth={maxWidth}
    $error={error}
    {...props}
  >
    <Label
      $state={state}
      $size={size}
      $error={error}
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
  $fillWidth?: boolean;
  $maxWidth?: string;
  $height?: string;
  $order?: bigStatOrder;
  $size?: bigStatSize;
  $spacing?: bigStatSpacing;
  $state?: bigStatState;
  $error?: boolean;
}>`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  ${({
    $fillWidth = false,
    $maxWidth = 'none',
    $state = 'default',
    $size = 'lg',
    $height = 'fixed',
    $order,
    $spacing = 'sm',
    $error = false,
    theme,
  }) => `
    background-color: ${theme.click.bigStat.color.background[$state]};
    color: ${theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
    border-radius: ${theme.click.bigStat.radii.all};
    border: ${theme.click.bigStat.stroke} solid ${
      $error
        ? theme.click.bigStat.color.stroke.danger
        : theme.click.bigStat.color.stroke[$state]
    };
  gap: ${theme.click.bigStat.space[$spacing].gap};
  padding: ${theme.click.bigStat.space.all};
  min-height: ${$height !== undefined ? `${$height}` : 'auto'};
  flex-direction: ${$order === 'titleBottom' ? 'column-reverse' : 'column'};
  width: ${$fillWidth === true ? '100%' : 'auto'};
  max-width: ${$maxWidth ? $maxWidth : 'none'};
  `}
`;

const Label = styled.div<{
  $state?: bigStatState;
  $size?: bigStatSize;
  $error?: boolean;
}>`
  ${({ $state = 'default', $size = 'lg', $error = false, theme }) => `
    color: ${$error ? theme.click.bigStat.color.label.danger : theme.click.bigStat.color.label[$state]};
    font: ${theme.click.bigStat.typography[$size].label[$state]};
  `}
`;

const Title = styled.div<{
  $state?: bigStatState;
  $size?: bigStatSize;
}>`
  ${({ $state = 'default', $size = 'lg', theme }) => `
    color: ${theme.click.bigStat.color.title[$state]};
    font: ${theme.click.bigStat.typography[$size].title[$state]};
  `}
`;
