import { styled } from 'styled-components';

export const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    border-radius: ${theme.click.button.radii.all};
    gap: ${theme.click.button.basic.space.gap};
    font: ${theme.click.button.basic.typography.label.default};
    &:hover {
      font: ${theme.click.button.basic.typography.label.hover};
    }

    &:active,
    &:focus {
      font: ${theme.click.button.basic.typography.label.active};
    }

    &:focus-visible {
      outline: 2px solid ${theme.click.global.color.outline.default};
      outline-offset: 2px;
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:active {
      font: ${theme.click.button.basic.typography.label.disabled};
      cursor: not-allowed;
    }
    `}
`;
