import { SVGAssetProps } from './system/types';

const Flash = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25z"
    ></path>
  </svg>
);

export default Flash;
