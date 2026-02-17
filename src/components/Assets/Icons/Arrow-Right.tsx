import { SVGAssetProps } from './system/types';

const Arrow_Right = (props: SVGAssetProps) => (
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
      d="M4.48 11.98h14.99M13.483 5.988 19.52 12l-6.037 6.012"
    />
  </svg>
);

export default Arrow_Right;
