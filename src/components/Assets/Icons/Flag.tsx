import { SVGAssetProps } from './system/types';

const Flag = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 21.0002V3.93018"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 14.02V4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13.9999C5 13.9999 5.875 13.2729 8.5 13.2729C11.125 13.2729 12.875 14.9999 15.5 14.9999C18.125 14.9999 19 14.0229 19 14.0229"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 3.932C5 3.932 5.875 3 8.5 3C11.125 3 12.875 4.727 15.5 4.727C18.125 4.727 19 4 19 4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Flag;
