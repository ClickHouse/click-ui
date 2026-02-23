import { SVGAssetProps } from './system/types';

const Sparkle = (props: SVGAssetProps) => (
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
      d="M2.996 16.794a4.002 4.002 0 0 1 4.002 4.002 4.002 4.002 0 0 1 4.001-4.002 4.002 4.002 0 0 1-4.001-4.002 4.002 4.002 0 0 1-4.002 4.002ZM13.001 13.793a4.002 4.002 0 0 1 4.002 4.001 4.002 4.002 0 0 1 4.001-4.001 4.002 4.002 0 0 1-4.001-4.002A4.002 4.002 0 0 1 13 13.793v0ZM6.998 6.79A4.002 4.002 0 0 1 11 10.79 4.002 4.002 0 0 1 15 6.79 4.002 4.002 0 0 1 11 2.788 4.002 4.002 0 0 1 6.998 6.79Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Sparkle;
