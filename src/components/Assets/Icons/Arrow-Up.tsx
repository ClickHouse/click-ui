import { SVGAssetProps } from './system/types';

const Arrow_Up = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.98 19.52V4.53M5.988 10.517 12 4.48l6.012 6.037"
    />
  </svg>
);

export default Arrow_Up;
