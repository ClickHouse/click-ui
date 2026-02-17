import { SVGAssetProps } from './system/types';

const Play = (props: SVGAssetProps) => (
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
      d="M10.336 3.156a8.99 8.99 0 0 0-5.224 3.05M3.49 9.08a8.874 8.874 0 0 0 .049 5.973M5.209 17.9a8.982 8.982 0 0 0 5.128 2.944M13.638 3.152a8.997 8.997 0 0 1 0 17.696"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10.941 9.057 3.884 2.297a.75.75 0 0 1 0 1.292l-3.884 2.297a.75.75 0 0 1-1.132-.647V9.703a.75.75 0 0 1 1.132-.646v0Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Play;
