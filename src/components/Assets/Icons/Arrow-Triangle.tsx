import { SVGAssetProps } from './system/types';

const Arrow_Triangle = (props: SVGAssetProps) => (
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
      d="m15.612 21-2.064-2.05 2.064-2.048"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m18.45 12.297 2.306 3.965c.695 1.195-.174 2.689-1.564 2.689h-5.644M13.565 7.998l2.82.75.755-2.798M6.066 11.41l-2.822 4.852c-.695 1.195.174 2.689 1.564 2.689H9.42"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.13 7.86 2.306-3.964c.695-1.195 2.433-1.195 3.128 0l2.822 4.852M3.247 12.16l2.82-.75.755 2.799"
    />
  </svg>
);

export default Arrow_Triangle;
