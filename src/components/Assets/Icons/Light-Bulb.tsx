import { SVGAssetProps } from './system/types';

const Light_Bulb = (props: SVGAssetProps) => (
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
      d="M10.249 15.502h3.502M11 18.003h2"
    />
    <rect
      width={18.008}
      height={18.008}
      x={2.996}
      y={2.997}
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={5}
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.386 13.316a4.251 4.251 0 1 0-6.772 0"
    />
  </svg>
);

export default Light_Bulb;
