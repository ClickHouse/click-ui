import { SVGAssetProps } from './system/types';

const Arrow_Directions = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.6 3.3999L5 6.9999L8.6 10.5999"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 7H5"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.4004 20.5999L19.0004 16.9999L15.4004 13.3999"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 17H19"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow_Directions;
