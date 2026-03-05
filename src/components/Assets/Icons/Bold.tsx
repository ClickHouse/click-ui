import { SVGAssetProps } from './system/types';

const Bold = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.75 12H13.75C15.683 12 17.25 13.567 17.25 15.5V15.5C17.25 17.433 15.683 19 13.75 19H6.75V5H12.583C14.516 5 16.083 6.567 16.083 8.5V8.5C16.083 10.433 14.516 12 12.583 12"
      stroke="#161517"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Bold;
