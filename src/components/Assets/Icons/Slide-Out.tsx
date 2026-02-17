import { SVGAssetProps } from './system/types';

const Slide_Out = (props: SVGAssetProps) => (
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
      d="M18.703 12.015H6.836M11.576 16.509l-4.78-4.51 4.78-4.508"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5 7v10"
    />
  </svg>
);

export default Slide_Out;
