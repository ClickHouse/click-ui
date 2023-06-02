import PropTypes from 'prop-types'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  color?: string
}

export const defaultIconProps: IconProps = {
  color: 'currentColor',
}

interface IconTypes {
  color: any
}

export const IconPropTypes: IconTypes = {
  color: PropTypes.string,
}

export interface DualColorIconProps extends React.SVGAttributes<SVGElement> {
  color?: string
  bgColor?: string
}

export const defaultDualColorIconProps: DualColorIconProps = {
  color: 'currentColor',
  bgColor: 'inherit',
}

interface DualColorIconTypes {
  color: any
  bgColor: any
}

export const DualColorIconPropTypes: DualColorIconTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
}
