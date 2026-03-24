import { styled } from 'styled-components';

export const FormRoot = styled.div<{
  $orientation?: 'horizontal' | 'vertical';
  $dir?: 'start' | 'end';
  $addLabelPadding?: boolean;
}>`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.click.field.space.gap};
  ${({ theme, $orientation = 'vertical', $dir = 'start', $addLabelPadding = false }) => `
    flex-direction: ${
      $orientation === 'horizontal'
        ? $dir === 'start'
          ? 'row-reverse'
          : 'row'
        : $dir === 'start'
          ? 'column-reverse'
          : 'column'
    };
    align-items: flex-start;
    ${
      $addLabelPadding && $orientation === 'horizontal'
        ? `
    label {
      padding-top: calc(${theme.click.field.space.y} + 1px);
      line-height: 1lh;
    }
    `
        : ''
    }
  `}
  * {
    box-shadow: none;
    outline: none;
  }
`;
