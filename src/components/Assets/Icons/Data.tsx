import { SVGAssetProps } from './system/types';

const Data = (props: SVGAssetProps) => (
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
      d="m11.617 14.408 1.5 1.5-1.5 1.5M9.598 11.617l-1.5 1.5-1.5-1.5"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.369 15.643C8.938 19.362 10.349 22 12.005 22c2.158 0 3.908-4.477 3.908-10s-1.75-10-3.908-10-3.907 4.477-3.907 10v1.117"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.117 15.908H12c-5.523 0-10-1.75-10-3.908s4.477-3.908 10-3.908S22 9.842 22 12c0 1.655-2.638 3.067-6.357 3.636"
    />
  </svg>
);

export default Data;
