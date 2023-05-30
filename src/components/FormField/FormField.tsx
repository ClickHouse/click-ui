import styled from 'styled-components'
import { States } from '../types'

export type LabelProps = {
  state: States
  text: string
}

export const Label = styled.label<Pick<LabelProps, 'state'>>`
  font: ${({state}) => (
    `var(--click-field-typography-label-${state})`
  )};

  display: flex;
  align-items: center;
  color: var(--click-field-color-label-default);
`

export function TextFieldLabel({ state, text }: LabelProps) {
  return <Label state={state}>{text}</Label>
}

