import styled, { css } from "styled-components";

export const FormElement = css`
  display: flex;
  align-items: center;

  padding: 0.34375rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid var(--click-field-color-stroke-default, #e6e7e9);
  background: var(--click-field-color-background-default, #f6f7fa);
  &:hover {
    border: 1px solid var(--click-field-color-stroke-hover, #cccfd3);
  }
  &:focus,
  &[data-state="open"] {
    border: 1px solid var(--click-field-color-stroke-active, #161517);
    background: var(--click-field-color-background-active, #fff);
  }
  &.error {
    border: 1px solid var(--click-field-color-stroke-error, #c10000);
    background: var(--click-field-color-background-active, #fff);
  }
  &:disabled,
  &.disabled {
    border: 1px solid var(--click-field-color-stroke-disabled, #dfdfdf);
    background: var(--click-field-color-background-disabled, #dfdfdf);
  }
`;

export const Label = styled.label<{ disabled?: boolean; error?: boolean }>`
  color: ${(props) =>
    props.disabled
      ? "var(--click-field-color-label-disabled, #A0A0A0)"
      : props.error
      ? "var(--click-field-color-label-error, #C10000)"
      : "var(--click-field-color-label-default, #696E79)"};

  /* click/field/typography/label/default */
  font-size: 0.75rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: fill-available;
  align-items: flex-start;
  gap: 0.5rem;
  * {
    box-shadow: none;
    outline: none;
  }
  &:focus-within,
  &:focus .cui-label {
    color: var(--click-field-color-label-active, #161517);
  }
`;

export const OptionContainer = css`
  display: flex;
  width: 100%;
  padding: 0.34375rem 0.75rem;
  align-items: center;
  gap: 0.5rem;
  background: var(--click-context-menu-color-background-default, #fff);
  color: var(--click-context-menu-color-text-default, #161517);

  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &[aria-selected] {
    outline: none;
  }
  &[data-highlighted] {
    background: var(--click-context-menu-color-background-hover, #f6f7fa);
    color: var(--click-context-menu-color-text-hover, #161517);
  }
  &[data-disabled] {
    color: var(--click-context-menu-color-text-disabled, #c0c0c0);
    background: var(--click-context-menu-color-background-default, #fff);
    pointer-events: none;
  }
  &[data-state="checked"] {
    background: var(--click-context-menu-color-background-active, #f6f7fa);
    color: var(--click-context-menu-color-text-active, #161517);
    font-weight: 600;
  }
`;

export const Error = styled.div`
  color: var(--click-field-color-label-error, #c10000);
  /* click/field/typography/label/error */
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;
