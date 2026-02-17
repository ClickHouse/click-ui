import { SVGAssetProps } from './system/types';

const BackUps = (props: SVGAssetProps) => (
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
      d="M3.997 13A8.003 8.003 0 1 0 12 4.997H4.997M7.998 1.996l-3 3.001M7.998 7.998l-3-3"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.235 11.851-2.792 2.791-1.678-1.672"
    />
  </svg>
);

export default BackUps;
